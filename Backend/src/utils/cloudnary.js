//file   already in server, so file path from server will be provided to cloudinary

import {v2 as cloudinary} from  "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
      if(!localFilePath) return null
      //upload file on cloudinary
      const uploadResult = await  cloudinary.uploader.upload(localFilePath ,{
        resource_type : "auto"
      })
      //file ahs been uploaded successfully
      fs.unlinkSync(localFilePath);
      return uploadResult;
    }
    catch(error) {
     fs.unlinkSync(localFilePath) //remove the locally saved temp file as the upload operation failed
     return null;
    }
}

export  {uploadOnCloudinary}