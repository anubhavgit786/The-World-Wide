import {asyncHandler} from "../utils/asyncHandler.js"
import {Place} from "../models/places.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const oneCity = asyncHandler( async (req ,res) => {
    //
  const place =   await Place.findById(req.params.id).select( { __v: 0 , createdAt:0 , updatedAt: 0  })
  
  res.status(200).json(
    new ApiResponse( 200 , place , "Fetched Data Successfully !!")
  );
})

export {oneCity}