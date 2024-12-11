const  express  = require('express');

const cors = require("cors")

const bodyParser = require('body-parser')
const dotenv = require( 'dotenv')
const connectDB = require(  './config/db')
const licenseRoutes = require(  './routes/licenseRoutes')

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().catch(console.dir);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/licenses', licenseRoutes);

app.use('/', (req, res)=> res.send("Driver Licence Verification API"));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
