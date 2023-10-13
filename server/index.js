import express from "express"; 
import dotenv from "dotenv";       
import connectDB from "./Config/db.js";    
import articleRoutes from "./routes/articleRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";


const app = express();

dotenv.config();



app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
connectDB();

// Define a route for the root URL ("/") that returns a JSON response
app.get("/", function (req, res) {
  res.json({
    name: "Hello Vaishnav",
  });
});



app.use('/api', articleRoutes);
app.use('/api', categoryRoutes);


const PORT = process.env.PORT || 8000;


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));