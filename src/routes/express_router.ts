import { Db,ObjectId } from 'mongodb';
import {connectToDB} from '../connection/db'
import express,{Request,Response} from 'express';

const router = express.Router();


let db: Db;
connectToDB().then(database => {
  db = database;
});

const adminAuth = async (req: Request, res: Response, next: Function) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized: No credentials provided' });
    }
  
    const [username, password] = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');
  
    try {
      const adminCollection = db.collection('admin_movies');
      const admin = await adminCollection.findOne({ username });
  
      if (admin && admin.password === password) {
        return next();
      } else {
        return res.status(403).json({ message: 'Forbidden: Invalid credentials' });
      }
    } catch (err) {
      console.error('Error checking admin credentials:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

router.get('/movies',async(req:Request,res:Response) => {
    try{
        if(!db){
            res.status(500).json({ message: 'Database not connected' });
            return;
        }
        const moviesCollection = db.collection('movies');
        const movies = await moviesCollection.find({}).toArray(); 
        res.status(200).json(movies);
    } catch(e){
        console.error('Error fetching movies:', e);
        res.status(500).json({ message: 'Error fetching movies' });
    }
})

router.get('/search',async(req:Request,res:Response) => {
    try{
        const { title, genre } = req.query;

        if(!db){
            res.status(500).json({ message: 'Database not connected' });
            return;
        }
        const filter: any = {};
        if (title || genre) {
          filter.$or = [];
          if (title) filter.$or.push({ title: { $regex: title, $options: 'i' } });
          if (genre) filter.$or.push({ genre: { $regex: genre, $options: 'i' } });
        }

        const moviesCollection = db.collection('movies');
        const movies = await moviesCollection.find(filter).toArray();
        if(!movies){
          res.status(500).json({"err":"No movies found"});
        }
        res.status(200).json(movies);
    } catch(e){
        console.error('Error fetching movies:', e);
        res.status(500).json({ message: 'Error fetching movies' });
    }
})

router.post('/movies', adminAuth, async (req: Request, res: Response):Promise<void> => {
    try {
      const { title, genre, rating, streaming_link } = req.body;
  
      if (!title || !genre || !rating || !streaming_link) {
        res.status(400).json({ message: 'Bad Request: All fields are required' });
        return;
      }
  
      const moviesCollection = db.collection('movies');
      
      const newMovie = { title, genre, rating, streaming_link };
  
      await moviesCollection.insertOne(newMovie);
  
      res.status(200).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (err) {
      console.error('Error adding movie:', err);
      res.status(500).json({ message: 'Error adding movie' });
    }
});

router.put('/movies/:id',adminAuth, async(req: Request, res: Response)=>{
    const { id } = req.params; // Extract movie ID from the URL
    const { title, genre, rating, streaming_link } = req.body; // Extract movie details from the request body

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid movie ID' });
      return;
    }

    // Validate the input fields
    if (!title && !genre && !rating && !streaming_link) {
      res.status(400).json({ message: 'At least one field (title, genre, rating, streamingLink) must be provided for update' });
      return;
    }

    const moviesCollection = db.collection('movies'); // Access the movies collection

    // Prepare the update document
    const updateFields: Partial<{ title: string; genre: string; rating: number; streaming_link: string }> = {};
    if (title) updateFields.title = title;
    if (genre) updateFields.genre = genre;
    if (rating) updateFields.rating = rating;
    if (streaming_link) updateFields.streaming_link = streaming_link;

    const result = await moviesCollection.updateOne(
      { _id: new ObjectId(id) }, // Filter by movie ID
      { $set: updateFields } // Fields to update
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    res.status(200).json({ message: 'Movie updated successfully' });
})

router.delete('/movies/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      // Validate the ID
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid movie ID' });
        return;
      }
  
      const moviesCollection = db.collection('movies');
      const result = await moviesCollection.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        res.status(400).json({ message: 'Movie not found' });
        return;
      }
  
      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
      console.error('Error deleting movie:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;