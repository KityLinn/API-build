import express from "express"
import { ObjectId } from "bson"
import db from "../db/conn.mjs"

const router = express.Router();
router.use(express.json());


// Get a list of 50 posts
router.get("/blog", async (req, res) => {
  let collection = await db.collection("blog");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/blog/:id", async (req, res) => {
  let collection = await db.collection("blog");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/blog", async (req, res) => {
  let collection = await db.collection("blog");
    const title = req.body.title
    const body = req.body.body
    const tag = req.body.tag
    if(!title && !body) {
      (res.status(500).send("title and body required"))
    } else if (!title) {
      (res.status(500).send("title required"))
    } else if (!body) {
      (res.status(500).send("body required"))
    } else if (!Array.isArray(tag)) {
      (res.status(500).send("tag must be an array"))
    } else {
      let result = await collection.insertOne({title, body, tag});
      res.send(result).status(204);
      }
  //let newDocument = req.body;
  //newDocument.date = Date.now();
});

// Update the post with a new comment
router.patch("/blog/comment/:id", async (req, res) => {
  const query = {_id: new ObjectId(req.params.id)};
  const updates = {
    $push: { comments: req.body }
  };
  let collection = await db.collection("blog");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// update a single post
router.put("/blog/:id", async (req, res) => {
  let collection = await db.collection("blog");
  const title = req.body.title
  const body = req.body.body
  const tag = req.body.tag
  const query = {_id: new ObjectId(req.params.id)};
  const updates = {
    $set:  {title, body, tag}
  };
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// Delete an entry
router.delete("/blog/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = db.collection("blog");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

export default router;

