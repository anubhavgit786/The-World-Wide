import {asyncHandler} from "../utils/asyncHandler.js"
import {Place} from "../models/places.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { visitedPlaces } from "../models/visitedPlaces.models.js";

const deleteCity = asyncHandler( async (req ,res) => {
    
  const data =   await Place.deleteOne({ "_id" : req.params.id })
  
  if(!data.deletedCount) { throw new Error("Something went wrong while removing the city")}

  const deletedvisitedplaces = await visitedPlaces.deleteOne(
    {
        $and : [ 
               { user:req.user._id } ,
               { city : req.params.id }
               ]
              }
  )
  if(!deletedvisitedplaces.deletedCount) { throw new Error("Something went wrong while removing the city")}
  res.status(200).json(
    new ApiResponse( 200 , [data,deletedvisitedplaces] , "City removed successfully!!")
  );
})

export {deleteCity}