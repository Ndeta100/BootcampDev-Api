const jwt=require('jsonwebtoken')
const asyncHandler=require('./async')
const ErrorResponse=require('../utils/errorResponse')
const User=require('../models/Users')
const {promisify}=require('util')

//Protect routes

exports.protect= asyncHandler(async(req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ 
      //Set token from Bearer token in header
        token=req.headers.authorization.split(' ')[1]
    }

    //Set token from cookie
    // else if(req.cookies.token){
    //     token= req.cookies.token
    // }

//Make sure token exist
if(!token){
    return next(new ErrorResponse('Not authorized to access this route', 401))
}

//Verify token


const decoded=await promisify(jwt.verify)(token, process.env.JWT_SECRET)
console.log(decoded) 
try{
    req.user=await User.findById(decoded.id)
next()
}catch(err){
    next(ErrorResponse('User not authorized to access this route', 403))
}
})

//Grant access to specific roles

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
