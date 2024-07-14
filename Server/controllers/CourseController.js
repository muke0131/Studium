const Course=require("../models/CourseModel");
const Category=require("../models/CategoryModel");
const User=require("../models/UserModel");
const {uploadImageToCloudinary}=require("../utils/imageUpload");

exports.createCourse=async (req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,tag,category,instructions="",status="Draft"}=req.body;
        const thumbnail=req.files.thumbnailImage;

        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!category||!thumbnail  || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }


        const userId=req.user.id;
        const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        const categoryDetails=await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details not found"
            })
        }

        console.log(`category ${categoryDetails}`)

        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        const newCourse=await Course.create({
            courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails.id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
        });

        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        )

        await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to create Course",
            error:error.message
        })
    }
}

exports.showAllCourses=async (req,res)=>{
    try{
        const allCourses=await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourses
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Cannnot Fetch course data",
            error:error.message
        })
    }
}

exports.getCourseDetails=async (req,res)=>{
    try{
        const {courseId}=req.body;
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"Invalid request"
            })
        }
        const courseDetails=await Course.findById(courseId)
        .populate({path:"instructor",populate:{path:"additionalDetails"}})
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`
            })
        }

        return res.status(200).json({
            success:true,
            message:"Successfuly fetched Course details",
            courseDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
