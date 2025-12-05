import express from 'express';
import cors from 'cors';
import connectDb from './config/db.js';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';

config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.use("/api/auth", authRoutes);
app.use('/api/tasks', tasksRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
