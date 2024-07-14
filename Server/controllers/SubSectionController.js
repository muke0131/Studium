const Section=require("../models/SectionModel");
const SubSection=require("../models/SubSectionModel");
const {uploadImageToCloudinary}=require("../utils/imageUpload")

exports.createSubSection=async (req,res)=>{
    try{
        //fetch data

        const {sectionId,title,timeDuration,description}=req.body;

        //extract files/videos
        const video=req.files.videoFile;
        //validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }
        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);


        //create a sub section
        const SubSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        })
        //update subsection id in Section

        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
            {$push:{
                subSection:SubSectionDetails._id,
            }},
            {new:true}
        ).populate("subSection");
        //return response
        return res.status(200).json({
            success:true,
            message:"Sub Section Created Successfully",
            updatedSection
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Subsection is not created",
            error:error.message
        })
    }
}
exports.updateSubSection=async (req,res)=>{
    try{
        const {subSectionId,title,timeDuration,description}=req.body;
        const video=req.files.videoFile;
        if(!subSectionId || !title || !timeDuration || !description || !video){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const SubSectionDetails=await SubSection.findByIdAndUpdate({_id:subSectionId},{
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        },{new:true});
        return res.status(200).json({
            success:true,
            message:"Sub Section Updated Successfully",
            SubSectionDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Subsection is not updated",
            error:error.message

        })
    }
}
exports.deleteSubSection=async (req,res)=>{
    try{
        const {subSectionId}=req.params;

        const subSection=await SubSection.findByIdAndDelete({_id:subSectionId});
        return res.status(200).json({
            success:true,
            message:"SubSection Deleted Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable To delete the SubSection",
            error:error.message
        })
    }
}