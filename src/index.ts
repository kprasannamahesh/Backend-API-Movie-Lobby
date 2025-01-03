import router from './routes/express_router';
import express,{Request,Response,NextFunction} from 'express';
// import {connectToDB} from './connection/db';
// import {Db} from 'mongodb';
const app = express();

// Middleware
app.use(express.json());

// let db: Db;

// connectToDB()
//   .then(database => {
//     db = database;
//     console.log('MongoDB connected');
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit if the database connection fails
//   });
app.use('/', router);

// app.use((req: Request, res: Response, next: NextFunction) => {
//     if (!db) {
//       res.status(500).json({ message: 'Database not initialized' });
//       return;
//     }
//     req.app.locals.db = db; // Attach the database to `app.locals`
//     next();
//   });

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
