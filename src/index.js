import express from "express";
import mongoose from "mongoose"
import bodyParser from "body-parser";
import Auth from "./routes/userRoute/userRoute.js";
import AirPortRoute from "./routes/SearchAirline/SeatchAirline.js";
// import redis from "redis";
// import client from "./redisclient/redisclient.js";
// const client =redis.createClient("redis://127.0.0.1.6379");
// client.connect();
// client.on("connect",function(){
//   console.log("connected to redis")
// })

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth',Auth);
app.use('/api/use',AirPortRoute);


const URI="mongodb://localhost:27017/airlines"
mongoose.connect(URI)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
  
app.listen(3002,(req,res)=>{
    console.log(`server is running on 3002`);
})
