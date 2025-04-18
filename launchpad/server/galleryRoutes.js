const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
let galleryRoutes = express.Router();

// Retrieve All
// REMOVED VERIFY TOKEN FUNCTION CALL... (VerifyToken, async...)
// galleryRoutes.route("/Gallery").get(async (request, response) => {
//   let db = database.getDb();
//   let data = await db.collection("Gallery").find({}).toArray();
//   if (Object.keys(data).length > 0) {
//     response.json(data);
//   } else {
//     throw new Error("Data not found");
//   }
// });

// Retrieve One
// galleryRoutes
//   .route("/Gallery/:id")
//   .get(async (request, response) => {
//     let db = database.getDb();
//     let data = await db
//       .collection("Gallery")
//       .findOne({ _id: new ObjectId(request.params.id) });
//     if (Object.keys(data).length > 0) {
//       response.json(data);
//     } else {
//       throw new Error("Data not found");
//     }
//   });

// Update
// galleryRoutes
//   .route("/Gallery/:id")
//   .put(async (request, response) => {
//     let db = database.getDb();
//     let mongoObject = {
//       $set: {
//         museum: request.body.museum,
//         title: request.body.title,
//         description: request.body.description,
//         imageId: request.body.imageId,
//       },
//     };
//     let data = await db
//       .collection("Gallery")
//       .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
//     response.json(data);
//   });

// Security check. Verifying saved token matches with that on the backend (to avoid malicious alterations)
// function verifyToken(request, response, next) {
//   console.log("LOWER>>>", request.headers["authorization"]);

//   const authHeaders = request.headers["authorization"];
//   const token = authHeaders && authHeaders.split(" ")[1];

//   if (!token) {
//     return response
//       .status(401)
//       .json({ message: "Auth token missing (VerifyToken)" });
//   }
//   jwt.verify(token, process.env.SECRETKEY, (error, user) => {
//     if (error) {
//       return response.status(403).json({ message: "Auth token not accepted" });
//     }

//     request.user = user;
//     next();
//   });
// }
module.exports = galleryRoutes;
