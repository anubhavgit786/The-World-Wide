import {asyncHandler} from "../utils/asyncHandler.js"

import { ApiResponse } from "../utils/ApiResponse.js";


const convertToEmoji = (countryCode)=> 
    {
        const codePoints = countryCode
                            .toUpperCase()
                            .split("")
                            .map((char) => 127397 + char.charCodeAt());
            
        return String.fromCodePoint(...codePoints);
    }

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const useCity = asyncHandler( async(req,res) => {
   const lat= req.params['lat'];
   const lng = req.params['lng'];
   
  
   if(!lat || !lng)
    {
        throw new Error("Start by clicking somewhere on the map");
    }

   
   const cityData = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
   if (!cityData.ok) 
    {
        throw new Error("Something went wrong with fetching City");
    }

    const data = await cityData.json();
    if (data.Response === "False") 
        {
            throw new Error("City not found");
        }

        if(!data.countryCode)
        {
            throw new Error("👋Click somewhere else to get city information 🥲");
        }
        
   
      const reverseData = {
        countryName : data.countryName,
        countryCode : data.countryCode,
        emoji : convertToEmoji(data.countryCode),
        cityName : data.city || data.locality || ""
      }

  res.status(200).json( new ApiResponse(200 , reverseData , "Reverse Geocoding done successfully"));

})


export {useCity}