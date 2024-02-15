import express from "express"
import { ObjectId } from "bson"

import db from "../db/conn.mjs"
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const router = express.Router();
router.use(express.json());


// This will help us connect to the database


// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("Data");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Data");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("Data");
  let newDocument = req.body;
  //newDocument.date = Date.now();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update the post with a new comment
router.patch("/comment/:id", async (req, res) => {
  const query = {_id: new ObjectId(req.params.id)};
  const updates = {
    $push: { comments: req.body }
  };
  let collection = await db.collection("Data");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// update a single post
router.put("/:id", async (req, res) => {
  console.log(req.body);
  const query = {_id: new ObjectId(req.params.id)};
  const updates = {
    $set:  req.body
  };
  let collection = await db.collection("Data");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = db.collection("Data");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

export default router;

