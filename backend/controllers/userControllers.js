const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
exports.createUser = catchAsyncErrors(
    async (req,res,next)=>{
        // console.log(req.body);
        const {name , email ,password} = req.body;
        const user = await User.create({
            name , 
            email , 
            password , 
            avatar:{
                public_id:"This is a sample id",
                url:"profile url"
            }});

        sendToken(user,201,res);
    }
)

//Login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("invalid email or password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid emailor password",401));
    }

    sendToken(user,200,res);
})

//Logout User 

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    
    res.status(200).json({
        success:true,
        message: "Logged Out"
    })
})

//Forgot Pasword

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User Not Found",404))
    }

    //Get ResetPasswordToken

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.host}/pi/v1/password/reset/${resetToken}`

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requsted this email then, please ignore it.`;

    try{
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    }catch (error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message,500));
    }
})

//Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    
    //creating tokrn hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400))
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match",400))

    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res);

})

// gettig user details
exports.getUserDetails=catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    });
});




exports.updatePassword=catchAsyncErrors( async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched =await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("old password is incorrect",400));
    }
    if(req.body.newPassword!==req.body.confirmPassword)
    {
        return next(new ErrorHandler("password does not match",400));
    }

    user.password=req.body.newPassword;

   await user.save();
    sendToken(user,200,res);
});





exports.updateProfile=catchAsyncErrors( async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        status:true,
    });
});
// to get all users (for admin)
exports.getAllUser=catchAsyncErrors( async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    });
});

// to get single user details (for admin)
exports.getSingleUser=catchAsyncErrors( async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user)
    {
      return next(new ErrorHandler(`user does not exist with id = ${req.params.id}`));
    }
    res.status(200).json({
        success:true,
        user
    });
});




