import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/users.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefreshToken } from "../utils/HandleAcessRefreshToken.js";


//get email,password
//not empty email password
// validate password
//store and generate access and refresh token
// send cookies
//resposne 

const loginUser = asyncHandler( async(req,res) => {
    const {email ,password} = req.body ;

    if( email == "" || password == "" ) throw new Error( "email and password are required");

    const user = await User.findOne( {email});

    if(!user) throw new Error( "User does not exist");

    const isPasswordValid = await user.isPasswordCorrect( password )

    if(!isPasswordValid) throw new Error("Invalid User Credentials");

 const {accessToken ,refreshToken }  =await generateAccessAndRefreshToken(user._id)

// console.log( accessToken , refreshToken)
 user.password = undefined
//user.refreshToken = undefined
const options = {
    httpOnly:true,
    secure :true
}

return res.status(200).
cookie("accessToken" , accessToken , options).
cookie("refreshToken" , refreshToken,options)
.json(
    new ApiResponse(
         200 ,
         {
            user , accessToken, refreshToken
         },
         "User logged in successfully"
        )
)


})

export {loginUser}