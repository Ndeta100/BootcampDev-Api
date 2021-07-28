const express=require('express')
const router= express.Router()


const {getBootcamp, getBootcamps, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload}= require('../controllers/bootcamps')
const Bootcamp=require('../models/Bootcamp')
const advancedResults=require('../middleware/advancedResults')
const {protect, authorize}=require('../middleware/auth')
//Include other resource routers
const courseRouter=require('./courses')
const reviewRouter=require('./reviews')
//Re-routes into other resource routers
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)
router.route('/:radius/:zipcode/:distance').get(getBootcampsInRadius)
router.route('/').get(advancedResults( Bootcamp, 'courses'),getBootcamps).post(protect,authorize('admin', 'publisher'), createBootcamp)

router.route('/:id/photo').put(protect, authorize('admin'), bootcampPhotoUpload)

router.route('/:id').get(getBootcamp).put(protect,authorize('admin','publisher'), updateBootcamp).delete(protect,authorize('admin','publisher'), deleteBootcamp)


module.exports=router