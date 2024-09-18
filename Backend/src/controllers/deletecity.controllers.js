import {asyncHandler} from "../utils/asyncHandler.js"
import {Place} from "../models/places.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const deleteCity = asyncHandler( async (req ,res) => {
    
  const data =   await Place.deleteOne({ "_id" : req.params.id })
  
  if(!data.deletedCount) { throw new Error("Something went wrong while removing the city")}

  res.status(200).json(
    new ApiResponse( 200 , data , "City removed successfully!!")
  );
})

export {deleteCity}