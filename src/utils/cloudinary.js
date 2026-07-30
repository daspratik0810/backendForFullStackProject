import { v2 as cloudinary } from 'cloudinary';

import fs from "fs"

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

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
        const uploadResult = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type : "auto"
        })
        //file has been uploaded successfully
        console.log("File has been uploaded on cloudinary successfully!!",
        uploadResult.url
        );
        return uploadResult;
    } catch (error){
        console.log(error);
        //to remove/unlink the file from localserver as upload got failed
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}
