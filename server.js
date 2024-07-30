import dotenv from 'dotenv';
dotenv.config('');
import  express  from 'express';
import cors from "cors";
import connectDB from "./config/connectdb.js";
import userRoutes from './routes/userRoutes.js'
import blogRoute from './routes/blogRoute.js'
import notificationRoute from './routes/notificationRoute.js'
const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
// CORS Policy
app.use(cors());


// for JSON
app.use(express.json());

// Load Routes
app.use("/api/user",userRoutes);
app.use("/api/blog",blogRoute);
app.use("/api/notification",notificationRoute);

app.listen(port, () => {
    console.log(`server listening at http:localhost:${port}`);
})