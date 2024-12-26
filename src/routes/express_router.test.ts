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

  });

});
