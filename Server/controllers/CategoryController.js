const Category=require("../models/CategoryModel");


exports.createCategory=async (req,res)=>{
    try{
        const {name,description}=req.body;
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const categoryDetails=await Tag.create({
            name:name,
            description:description
        })

        return res.status(200).json({
            success:true,
            message:"Tag created Successfully"
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.showAllcategories=async (req,res)=>{
    try{
        const allTags=await Tag.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"All tags returned succcessfully",
            allTags
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}