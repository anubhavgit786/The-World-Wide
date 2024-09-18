import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usersSchema = new mongoose.Schema( {
    username: {
        type: String,
        required : true,
        unique : true,
        lowercase: true,
        trim:true
    },
    email:{
        type: String,
        required : true,
        unique : true,
       
    },
    password: {
        type:String,
        required  :true,

    },
    picture :{
        type:String,
        required :true,
    },
    
    visitedPlaces :[{
      type: mongoose.Schema.Types.ObjectId,
      ref : "Place"
    }],

    refreshToken:{
        type:String,
      
    }
    
} 
    ,{timestamps : true}
)

usersSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10)
    next()
} )

usersSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password)
}

usersSchema.methods.generateAccessToken = function( ){
    try {
      return  jwt.sign( 
            {
                _id:this._id,
                email : this.email,
                username : this.username // payload : key ->value pair
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    } catch (error) {
       throw new Error("Some error in generating access token")
    }
}
usersSchema.methods.generateRefreshToken = function( ){
   try {
    return  jwt.sign( 
         {
             _id:this._id,
           // payload : key ->value pair
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
             expiresIn : process.env.REFRESH_TOKEN_EXPIRY
         }
     )
   } catch (error) {
    throw new Error("Some error in generating refresh token")
   }
}


export const User = mongoose.model("User" , usersSchema)