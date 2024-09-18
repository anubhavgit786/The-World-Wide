import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/users.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudnary.js"

const registerUser  =asyncHandler( async(req,res) => {
   const {username , email , password } = req.body 

  if([username , email ,password].some( (field) => field?.trim() === "")) {
    throw new Error ("All fields are mandatory ")
  } 

  const existedUser = await User.findOne( {
    $or : [{username} , {email}]
  });

  if(existedUser) {
    throw new Error("User with email or username already exist")
  }
  
 const profilePictureLocalPath  = req.file?.path; 
 //since we want to upload a single file so we git its path using req.file.path no matter if your files name is anything and in form keep the name tag value as 'picture'
console.log(profilePictureLocalPath )
 const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
 const defaultPicture = `https://avatar.iran.liara.run/username?username=${username} `

 const user = await User.create({
  username : username.toLowerCase(),
  picture : profilePicture?.url || defaultPicture,
  email,
  password,
 }
 )

 if(!user){
  throw new Error( "Something went wrong while registering the user");
 }
user.password = undefined ;

return res.status(201).json( new ApiResponse(200 , user, "User Registered successfully" ));

})

export {registerUser}