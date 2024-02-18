import express from "express"
import { ObjectId } from "bson"
import db from "../db/conn.mjs"

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
    let collection = await db.collection("pokemon");
    let results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
  });



  
export default router;
