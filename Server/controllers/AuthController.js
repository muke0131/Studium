const User = require("../models/UserModel");
const OTP = require("../models/OTPmodel");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");

//sendOTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email :email});

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated", otp);
    let checkUniqueOtp = await OTP.findOne({ otp: otp });
    while (checkUniqueOtp) {
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      checkUniqueOtp = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    console.log(otpPayload);
    const otpBody = await OTP.create( otpPayload );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//signUP
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password value does not match,",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if(!recentOtp){
      return res.status(400).json({
        success: false,
        message: "OTP Not found",
      });
    }
    console.log(recentOtp[0].otp);
    const sentOtp=recentOtp[0].otp;

    if (sentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Not found",
      });
    } else if (otp !== sentOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPass,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User is Registered Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again "+error.message,
    });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const hashedPass = user.password;
    const validPass = await bcrypt.compare(password, hashedPass);
    if (validPass) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
    });
  }
};

//ChangPassword

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword != confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "NewPassword and ConfirmPassword value does not match",
      });
    }

    const user=req.user;
    const hashedPass=await bcrypt.hash(newPassword,10);

    const updatedUser=await User.findOneAndUpdate({email:user.email},{password:hashedPass},{new:true});

    return res.status(200).json({
        success:true,
        message:"Password changed successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Password cannot be changed",
    });
  }
};
