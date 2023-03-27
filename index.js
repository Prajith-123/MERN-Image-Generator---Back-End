//External packages
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

//Internal Packages
import connectDB from './mongoDB/connect';
import postRoutes from './routes/postRoutes';
import dalleRoutes from './routes/dalleRoutes';

dotenv.config();

//Initialize express
const app = express();

//Add additional middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from DALL.E!',
    });
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(7200, () => console.log('Server started on port 7200'));
    } catch (error) {
        console.log(error);
    }
};

startServer();