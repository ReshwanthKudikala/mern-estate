import express from 'express';
import {MongoClient} from 'mongodb';
import userRouter from './routes/user.route.js';
import dotenv from 'dotenv';
dotenv.config();
const app=express();


const MONGOURI=process.env.MONGOURI

const client = new MongoClient(MONGOURI)

client
  .connect()
  .then(() => {
    const db = client.db("MernEstate");
    const userCollection = db.collection("users");
    app.set("userCollection",userCollection);
    console.log("DB Connected Successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });





const PORT=process.env.PORT

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

app.use("/api/user",userRouter);