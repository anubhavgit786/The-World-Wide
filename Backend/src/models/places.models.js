import mongoose from "mongoose"

const placesSchema = new mongoose.Schema( {
    cityName:{
        type: String ,
        required: [true, "City Name can't be blank"],
        lowercase: true,
        trim: true
    },
    country:{
        type: String ,
        required: true,
        lowercase: true,
        trim: true
    },
    emoji:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        
    },
    position:{
        lat:{
            type: Number,
            required: true,
        },
        lng:{
            type:Number,
            required:true,
        }
    }
} 
    ,{timestamps : true}
)

export const Place = mongoose.model("Place" , placesSchema)