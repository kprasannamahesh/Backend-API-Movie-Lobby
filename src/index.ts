import router from './routes/express_router';
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

app.use('/', router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
