import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";

const app = express(); // Use `express()` instead of `Express()`


const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cumi");
    console.log("Mongodb Connected..");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected...");
});

//middlewares
//for json
app.use(express.json()); // Use `express.json()` instead of `Express.json()`
// Enable CORS for all routes
app.use(cors());

app.use("/sensor", router);

app.listen(4000, () => {
  connect();
  console.log("Server Started..");
});
