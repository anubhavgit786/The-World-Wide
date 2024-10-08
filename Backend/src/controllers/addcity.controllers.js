import {asyncHandler} from "../utils/asyncHandler.js"
import {Place} from "../models/places.models.js"
import { visitedPlaces } from "../models/visitedPlaces.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const addCity = asyncHandler( async (req ,res) => {
   // get citydata
   // validation - not empty
   //create places object- create entry in db
   //check is created
   //retun res

   const {cityName, country, emoji, date, notes, position : { lat, lng }} = req.body;
   console.log(lat);
   if(cityName ==="" || date ==="" || country ==="" || emoji==="" || lat ==="" || lng==="") {
     throw new Error("City and date fields are empty");
   }
   
   const place = await  Place.create({
      cityName: cityName ,
      country : country,
      emoji : emoji,
      date: date,
      notes : notes,
    position: {lat , lng},
   })

   

   if(!place) {
      throw new Error( "Something went wrong while saving the place in database");
   }

   const visitedCity = await visitedPlaces.create({
      city : place._id,
      user : req.user._id 
   }  )

   if(!visitedCity) {
      throw new Error( "Something went wrong while adding the visited place of user");
   }

  res.status(201).json( new ApiResponse(200 ,
     {_id: place._id,
      cityName: cityName ,
    country : country,
    emoji : emoji,
    date: date,
    notes : notes,
  position: {lat , lng},} ,
   "Place added successfully" ,  ))

})

export {addCity}