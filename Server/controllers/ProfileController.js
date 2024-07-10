
const Profile=require("../models/ProfileModel");
const User=require("../models/UserModel");
const Course=require("../models/CourseModel");

exports.updateProfile=async (req,res)=>{
    try{
        //fetch data , userId
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        const id=req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile(profileId);
        //update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;

        await profileDetails.save();
        //return response

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update profile",
            error:error.message
        })
    }
}

exports.deleteProfile=async(req,res)=>{
    try{
        const id=req.user.id;
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //Unenroll user from all courses

        // await Course.updateOne(
        //     {  }, // Filter for the user
        //     { $pull: { products: { name: 'T-shirt', price: 20 } } });
        await User.findByIdAndDelete({_id:id});



        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:"False",
            message:"Profile cannot be deleted"
        })
    }
}

exports.getAllUserDetails=async (req,res)=>{
    try{
        const id=req.user.id;

        const userDetails=await User.findById(id).populate("additionalDetails").exec()

        return res.status(200).json({
            success:true,
            message:"User data fetched successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}