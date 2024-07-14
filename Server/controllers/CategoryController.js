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
        const categoryDetails=await Category.create({
            name:name,
            description:description
        })

        return res.status(200).json({
            success:true,
            message:"Category created Successfully"
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.showAllCategories=async (req,res)=>{
    try{
        const allCategories=await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"All Categories returned succcessfully",
            allCategories
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.categoryPageDetails=async (req,res)=>{
    try{
        //get categoryId
        const {categoryId}=req.body;
        //get courses for specified categoryId
        const selectedCategory=await Category.findById(categoryId)
        .populate("courses").exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data Not found"
            })
        }
        //get courses for different categories
        const differentCategories=await Category.find({
            _id:{$ne:categoryId}
        }).populate("courses").exec();
        //get top selling courses

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories
            }
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}