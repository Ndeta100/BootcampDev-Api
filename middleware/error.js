const ErrorResponse = require("../utils/errorResponse")

const errorHandler= (err, req, res , next)=>{
    let error={...err}
    error.message=err.message
//Log to console for the dev
console.log(err)


//Mongoose bad Object id
if(err.name==='CastError'){
    const message = `Resource not found `

    error=new ErrorResponse(message, 404)

}
//MONGOOSE DUPLICATE KEY
if(err.code===11000){
    const message='Duplicate field value entered'
    error=new ErrorResponse(message, 400)
}

//Mongoose validation error
if(err.name==='ValidationError'){
    const message= Object.values(err.errors).map(val=>val.message)
    error=new ErrorResponse(message, 400)
}
console.log(err.name)
res.status(error.statusCode || 500).json({
    success:false,
    error:error.message || 'Server error'
})
}

module.exports=errorHandler