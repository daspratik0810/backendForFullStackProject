import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        //upload the file on cloudinary from localstorage
        const uploadResult = await cloudinary.uploader
        .upload(localFilePath, {
            public_id: 'shoes',
            resource_type : "auto"
        })
        //file has been uploaded successfully
        console.log("File has been uploaded on cloudinary successfully !!",response.url);
        return response
    } catch (error){
        console.log(error);
        //to remove/unlink the file from localserver as uploade got failed
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}
