require("dotenv").config()
const express=require("express");
const app=express();

const userRoutes=require("./routes/UserRoutes");
const profileRoutes=require("./routes/ProfileRoutes");
const paymentRoutes=require("./routes/PaymentRoutes");
const courseRoutes=require("./routes/CourseRoutes");

const connectToDb=require("./config/db");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload=require("express-fileupload");

const PORT=process.env.PORT || 4000;

connectToDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})