const express = require("express");
const { ObjectId } = require("mongodb"); // Correct import for ObjectId
const database = require("./connect"); // Corrected require statement
let postRoutes = express.Router();

//#1 - Retrieve All
postRoutes.route("/posts").get(async (requests, response) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    //going to leave this like this until the end because we want to have server stop when there is an err but when finished add catch
    throw new Error("Data was not found");
  }
});
//2 - Retrieve One
postRoutes.route("/posts/:id").get(async (requests, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(requests.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found");
  }
});
//3 - Create One
postRoutes.route("/posts").post(async (requests, response) => {
  let db = database.getDb();
  let mongoObject = {
    title: requests.body.title,
    description: requests.body.description,
    content: requests.body.content,
    author: requests.body.author,
    dateCreated: requests.body.dateCreated,
  };
  let data = await db.collection("posts").insertOne(mongoObject);
  response.json(data);
});

//4 - Update One
postRoutes.route("/posts/:id").put(async (requests, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      title: requests.body.title,
      description: requests.body.description,
      content: requests.body.content,
      author: requests.body.author,
      dateCreated: requests.body.dateCreated,
    },
  };
  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(requests.params.id) }, mongoObject);
  response.json(data);
});
//5   - Delete One
postRoutes.route("/posts/:id").delete(async (requests, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new objectId(requests.params.id) });
  response.json(data);
});

module.exports = postRoutes;
