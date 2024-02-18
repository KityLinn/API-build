import "./loadEnvironment.mjs";
import cors from "cors";
import blog from "./routes/blog.mjs"
import pokemon from "./routes/pokemon.mjs"
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
app.use("/blog", blog);
app.use("/pokemon", pokemon);

app.use(cors());
app.use(express.json());


// Global error handling
app.use(function (err, _req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});