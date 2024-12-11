import express from 'express';

import cors from "cors"

import bodyParser from 'body-parser';
import dotenv from  'dotenv'
import connectDB from   './config/db'
import licenseRoutes from   './routes/licenseRoutes'

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/licenses', licenseRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
