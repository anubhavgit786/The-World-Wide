import {asyncHandler} from "../utils/asyncHandler.js"
import {Place} from "../models/places.models.js"
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

   const createdPlace = await Place.findById(place._id);

   if(!createdPlace) {
      throw new Error( "Something went wrong while saving the place in database");
   }

  res.status(201).json( new ApiResponse(200 , createdPlace , "Place added successfully" ,  ))

})

export {addCity}