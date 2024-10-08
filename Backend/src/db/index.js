import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import express from "express";
const app = express();

const connectDB = async() => {
 try{
  const connectionInstance =  await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
  console.log("MongoDB connected !!")
 }
 catch(error){
    console.error("ERROR is:" , error);
    process.exit(1);
 }

 
}

export default connectDB

