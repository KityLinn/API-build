import "./loadEnvironment.mjs";
import cors from "cors";
import db from "./db/conn.mjs"
import posts from "./routes/posts.mjs"
import express from "express"

// Loads the configuration from config.env to process.env
import dotenv from 'dotenv';
dotenv.config({path: "./config.env" });



// get MongoDB driver connection


const PORT = process.env.PORT || 4000;
const app = express();

app.use("/posts", posts);

app.use(cors());
app.use(express.json());


// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
db.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});