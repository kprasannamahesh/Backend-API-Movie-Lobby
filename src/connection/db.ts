// src/db.ts
import { MongoClient } from 'mongodb';
import {MONGO_URI,ADMIN_USER,ADMIN_PASSWORD} from '../envVaraibles';


export const connectToDB = async () => {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('moviesDb');
    const authCollection = database.collection('admin_movies');
    const count = await authCollection.countDocuments();
    if (count === 0) {
      const res = await authCollection.insertOne({username:ADMIN_USER,password:ADMIN_PASSWORD});
      console.log(res);
    } else {
      console.log("credential exists");
    }
    
    return database; // Return the connected database
  } catch (err) {
    console.error('MongoDB connection error:', err);    
  }
};
