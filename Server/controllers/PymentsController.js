const {instance}=require("razorpay");
const Course=require("../models/CourseModel");
const User=require("../models/UserModel")
const mailSender=require("../utils/mailSender");

//capture the payment and initiate razorpay order
exports.capturePayment=async (req,res)=>{
    //get courseId and UserId
    const {courseId}=req.body;
    const userId=req.user.id;
    //validation
    //valid courseId
    if(!courseId){
        return res.status(404).json({
            success:false,
            message:"Please provide valid course ID"
        })
    };
    //valid courseDetails
    let course;
    try{
        course=await Course.findById(courseId);
        if(!course){
            return res.status(4040).json({
                success:false,
                message:"Could not find the course"
            })
        }

        //user already paid for the course
        const uid=new mongoose.Types.objectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    //order create
    const amount=course.price
    const currency="INR"

    const options={
        amount:amount*100,
        currency,
        reciept:Math.random(Date.now()).toString(),
        notes:{
            courseId:courseId,
            userId
        }
    };

    try{
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order"
        })
    }
    //return response
};

//Verify signature

exports.verifySignature=async(req,res)=>{
    const webhookSecret="12345678";

    const signature=req.headers("x-razorpay-signature");

    const shasum=crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if(signature==webhookSecret){
        console.log("Payment is Authorized");
        const {courseId,userId}=req.body.payload.payment.entity.notes;

        try{
            //find the course and enroll student in it
            const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            )

            console.log(enrolledCourse);

            //find the student and add course to their enrolled courses list
            const enrolledStudent = await User.findOneAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true}
            )

            console.log(enrolledStudent);

            const emailResponse=await mailSender(
                enrolledStudent.email,
                "Enrolled in Course ",
                "Congratulations You have Successfully enrolled in Studium Course"
            )

            console.log(emailResponse);

            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course added"
            })
        }
        catch(error){
            return res.status(500).json({
                success:true,
                message:error.message
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request"
        })
    }
}