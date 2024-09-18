import {User} from "../models/users.models.js"

export const generateAccessAndRefreshToken = async (userId) =>{
    try{
       const user = await User.findById(userId);
      
       const accessToken = await  user.generateAccessToken();
      
       const refreshToken = await user.generateRefreshToken();
     
       console.log( "refresh token" ,refreshToken) 

       user.refreshToken = refreshToken

       await user.save( {validateBeforeSave : false})
      
       return {accessToken ,refreshToken};
    }
    catch(error){
      throw new Error("Something went wrong while generating refresh and access token")
    }
}