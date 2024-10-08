import mongoose, { Schema } from "mongoose"

const visitedPlacesSchema = new mongoose.Schema( {
 city :{
  type: Schema.Types.ObjectId ,
  ref : "Place"

 },
 user :{
  type: Schema.Types.ObjectId ,
  ref : "User"
 }
} , {timestamps  :true})

export const  visitedPlaces= mongoose.model("visitedPlaces" , visitedPlacesSchema)