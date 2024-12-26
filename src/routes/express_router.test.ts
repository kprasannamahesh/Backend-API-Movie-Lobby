import request from 'supertest';
import express from 'express';
import router from './express_router'; // adjust the import as necessary

// Mock the database connection and db collection
jest.mock('../connection/db', () => ({
  connectToDB: jest.fn().mockResolvedValue({
    collection: jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([{ _id:Object(1),title: 'Movie 1', genre: 'Action' }]) }),
      insertOne: jest.fn().mockResolvedValue({ insertedId: '1' }),
      updateOne: jest.fn().mockResolvedValue({ matchedCount: 1 }),
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    }),
  }),
}));

const app = express();
app.use(express.json());
app.use(router);

describe('Movies Lobby API', () => {
  describe('GET /movies', () => {
    it('should return a list of movies', async () => {
      const response = await request(app).get('/movies');
      // console.log(response);
      console.log(response.body);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /search', () => {
    it('should return filtered movies based on query parameters', async () => {
      const response = await request(app).get('/search?title=Action&genre=Comedy');
      // console.log(response);
      expect(response.status).toBe(200);
    });

    // it('should return 500 if there is an error fetching movies', async () => {
    //   jest.mock('../connection/db', () => ({
    //     connectToDB: jest.fn().mockResolvedValue({
    //       collection: jest.fn().mockReturnValue({
    //         find: jest.fn().mockImplementation(() => {
    //           throw new Error('DB Error');
    //         }),
    //       }),
    //     }),
    //   }));
    //   const response = await request(app).get('/search?title=move2');
    //   // console.log(response);
    //   expect(response.status).toBe(500);
    //   expect(response.body.message).toBe('Error fetching movies');
    // });
  });

  // describe('POST /movies', () => {
  //   it('should add a new movie with valid data', async () => {
  //     const newMovie = { title: 'New Movie', genre: 'Action', rating: 'rating', streaming_link: 'link' };
  //     const response = await request(app).post('/movies').send(newMovie);
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe('Movie added successfully');
  //   });

  //   it('should return 400 if required fields are missing', async () => {
  //     const response = await request(app).post('/movies').send({});
  //     expect(response.status).toBe(400);
  //     expect(response.body.message).toBe('Bad Request: All fields are required');
  //   });
  // });

  // describe('PUT /movies/:id', () => {
  //   it('should update a movie with valid data', async () => {
  //     const updatedMovie = { title: 'Updated Movie', genre: 'Drama', rating: 9, streaming_link: 'new_link' };
  //     const response = await request(app).put('/movies/1').send(updatedMovie);
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe('Movie updated successfully');
  //   });

  //   it('should return 400 if movie ID is invalid', async () => {
  //     const response = await request(app).put('/movies/invalid-id').send({ title: 'Updated Movie' });
  //     expect(response.status).toBe(400);
  //     expect(response.body.message).toBe('Invalid movie ID');
  //   });

  //   it('should return 400 if no fields are provided for update', async () => {
  //     const response = await request(app).put('/movies/1').send({});
  //     expect(response.status).toBe(400);
  //     expect(response.body.message).toBe('At least one field (title, genre, rating, streamingLink) must be provided for update');
  //   });
  // });

  // describe('DELETE /movies/:id', () => {
  //   it('should delete a movie with a valid ID', async () => {
  //     const response = await request(app).delete('/movies/1');
  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe('Movie deleted successfully');
  //   });

  //   it('should return 400 if movie ID is invalid', async () => {
  //     const response = await request(app).delete('/movies/invalid-id');
  //     expect(response.status).toBe(400);
  //     expect(response.body.message).toBe('Invalid movie ID');
  //   });

  //   it('should return 404 if movie is not found', async () => {
  //     // jest.mock('../connection/db', () => ({
  //     //   connectToDB: jest.fn().mockResolvedValue({
  //     //     collection: jest.fn().mockReturnValue({
  //     //       deleteOne: jest.fn().mockResolvedValue({ deletedCount: 0 }),
  //     //     }),
  //     //   }),
  //     // }));
  //     const response = await request(app).delete('/movies/1');
  //     expect(response.status).toBe(404);
  //     expect(response.body.message).toBe('Movie not found');
  //   });
  // });
});
