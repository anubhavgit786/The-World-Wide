import {asyncHandler} from "../utils/asyncHandler.js"
import {Place} from "../models/places.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { visitedPlaces } from "../models/visitedPlaces.models.js";
import mongoose  from "mongoose";

const allCity = asyncHandler( async (req ,res) => {
    //
  const allVisitedCity =   await visitedPlaces.aggregate( [
    {
      $match :{
         user:new mongoose.Types.ObjectId(req.user._id)
      } 
    },
    

    {
      $lookup:{
        from : "places",
        localField : "city",
      foreignField : "_id",
      as : "visitedPlaces",
      pipeline : [
        {
          $project : {
            createdAt: 0,
            updatedAt:0,
            __v : 0
          }
        }
      ]
      }
    },
    {
      $addFields :{
        visitedPlaces : visitedPlaces
      }
    },
    {
      $group : {
        _id: null,
        visitedPlaces : {
          $addToSet :  "$visitedPlaces"

          
        },
       user : {
        $addToSet :  "$user"

        
      },
       
      }
    }
    
  ])
  
if(!allVisitedCity?.length) {
  throw new Error("No visited places exist for the user")
}


  res.status(200).json(
    new ApiResponse( 200 , allVisitedCity, "Fetched Data Successfully !!")
  );
})

export {allCity}