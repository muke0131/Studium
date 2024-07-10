const Section=require("../models/SectionModel");
const Course=require("../models/CourseModel")

exports.createSection=async (req,res)=>{
    try{
        const {sectionName,courseId}=req.body;
        
        if(!sectionName || !coureseID){
            return res.status(404).json({
                success:true,
                message:"Missing Properties"
            });
        }

        const newSection=await Section.create({sectionName});

        const updatedCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id
                }
            },
            {new:true}
        ).populate("Section").populate({path:"Section",populate:{path:"SubSection"}})

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Unable to Create Section",
            error:error.message
        })
    }
}

exports.updateSection=async (req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;

    if(!sectionName || !sectionId){
        return res.status(400).json({
            success:false,
            message:"Missing Parameters"
        })
    }

    const updatedSection=await Section.findByIdAndUpdate(
        sectionId,
        {sectionName},
        {new:true}
    )

    return res.status(200).json({
        success:true,
        message:"Section Updated Successfully"
    })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Unable to Update Section",
            error:error.message
        })
    }
}

exports.deleteSection=async (req,res)=>{
    try{
        const {sectionId}=req.params;
    const Section=await Section.findByIdAndDelete(sectionId)
    return res.status(200).json({
        success:true,
        message:"Section Deleted Successfully"
    })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Unable to Update Section",
            error:error.message
        })
    }
}