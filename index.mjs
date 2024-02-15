import "./loadEnvironment.mjs";
import cors from "cors";
import posts from "./routes/posts.mjs"
import express from "express"

// Loads the configuration from config.env to process.env
import dotenv from 'dotenv';
dotenv.config();



// get MongoDB driver connection


const PORT = process.env.PORT || 4000;
const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use("/data", posts);

app.use(cors());
app.use(express.json());


// Global error handling
app.use(function (err, _req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});