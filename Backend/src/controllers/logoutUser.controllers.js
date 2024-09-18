import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/users.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const logoutUser = asyncHandler ( async(req , res) => {
try {
  const updatedUser =   await User.findById(req.user._id ).select( "-password ")

  updatedUser.refreshToken = undefined 
  await updatedUser.save( {validateBeforeSave : false})

    await User.findById(req.user._id ).select( "-password ")


    const options = {
        httpOnly:true,
        secure :true
    }
    
    return res.status(200)
    .clearCookie("accessToken" ,options)
    .clearCookie("refreshToken" , options)
    .json ( 
        new ApiResponse( 200 , {} , "User successfully logged out !")
    )
    
} catch (error) {
    throw new Error("Some error occured while loging out the user" , error)
}
})
export {logoutUser}