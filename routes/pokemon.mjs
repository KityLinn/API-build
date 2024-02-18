import express from "express"
import { ObjectId } from "bson"
import db from "../db/conn.mjs"

const router = express.Router();
router.use(express.json());

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("pokemon");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("pokemon");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("pokemon");
    const name = req.body.name
    const type = req.body.type
    const owned = req.body.owned
    if(!name && !type) {
      (res.status(500).send("name and type required"))
    } else if (!name) {
      (res.status(500).send("name required"))
    } else if (!type) {
      (res.status(500).send("type required"))
    } else if (!Array.isArray(type)) {
      (res.status(500).send("type must be an array"))
    } else if (typeof owned != "boolean") {
      (res.status(500).send("owned must be a boolean"))
    } else {
      let result = await collection.insertOne({name, type, owned});
      res.send(result).status(204);
      }
  //let newDocument = req.body;
  //newDocument.date = Date.now();
});



// update a single post
router.put("/:id", async (req, res) => {
  let collection = await db.collection("pokemon");
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
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = db.collection("pokemon");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});


  
export default router;
