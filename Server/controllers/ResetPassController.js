const User=require("../models/UserModel");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt")

//resetPassToken
exports.resetPasswordToken=async (req,res)=>{
    try{
        const email=req.body.email;
        const user=await User.findOne({email:email});
        if(!user){
            return res.json({success:false,
                message:"Email is not registered"
            });
        }

        const token= crypto.randomUUID();
        const updatedDetails=await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*1000
            },
            {new:true}
        );
        const url=`http://localhost:3000/updat-password/${token}`;
        await mailSender(email,"Password Reset Link",
            `Password Reset Link : ${url}`
        );
        return res.json({
            success:true,
            message:"Email sent successfully, please check email and change Password"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Somethiing went wrong"
        })
    }

}

exports.resetPassword=async (req,res)=>{
    try{
        const {password,confirmPassword,token}=req.body;

    if(password !==confirmPassword){
        return res.json({
            success:false,
            message:"Password not matching"
        })

    }

    const userDetails=await User.findOne({token:token});

    if(!userDetails){
        return res.json({
            success:false,
            message:"Token is Invalid"
        });

    }
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.json({
            success:false,
            message:"Token is expired please regenerate your token"
        })
    }

    const hashedPass=await bcrypt.hash(password,10);

    await User.findOneAndUpdate({token:token},{password:hashedPass},{new:true});

    return res.status(200).json({
        success:true,
        message:"password reset successful"
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}