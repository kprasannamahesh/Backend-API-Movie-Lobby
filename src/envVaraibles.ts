import dotenv from 'dotenv';

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI!
export const ADMIN_USER = process.env.ADMIN_USER!
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!
