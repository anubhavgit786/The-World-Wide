import {asyncHandler} from "../utils/asyncHandler.js"
import {Place} from "../models/places.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const allCity = asyncHandler( async (req ,res) => {
    //
  const places =   await Place.find({} , { __v: 0 , createdAt:0 , updatedAt: 0  })
  
  res.status(200).json(
    new ApiResponse( 200 , places , "Fetched Data Successfully !!")
  );
})

export {allCity}