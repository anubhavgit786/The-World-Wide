import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/users.models.js";
import { generateAccessAndRefreshToken } from "../utils/HandleAcessRefreshToken.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const refreshAccessToken = asyncHandler(async(req,res) => {
   try {
     const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
 
     if(!incomingRefreshToken) {
         throw new Error( "Unauthorized request")
     }
      
    const decodedRefreshToken= jwt.verify( incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET )
    
    const user = await User.findById( decodedRefreshToken?._id).select( "-password ") 
 
    if(!user) {
     throw new Error("Invalid Refresh Token")
     }
     
 
     if( incomingRefreshToken != user?.refreshToken){
         throw new Error (" Refresh Token is expired or used")
     }
 
     const options = {
         httpOnly:true ,
         secure :true
     }
 
     const {accessToken , refreshToken}  = await generateAccessAndRefreshToken(user._id)
     console.log(refreshToken)

     return res
     .status(200).
     cookie("accessToken" , accessToken , options).
     cookie("refreshToken" , refreshToken,options).
     json(
         new ApiResponse ( 200 ,{
            
             accessToken , refreshToken : refreshToken
         } , "Access token updated successfully")
     )
   } catch (error) {
    throw new Error( error)
   }
   

})

export {refreshAccessToken}