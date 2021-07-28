const express=require('express')


const router= express.Router({mergeParams:true})
const {getCourses, getCourse, addCourse, updateCourse, deleteCourse}= require('../controllers/courses')

const Course= require('../models/Course')
const advnacedResults= require('../middleware/advancedResults')
const {protect, authorize}=require('../middleware/auth')
router.route('/').get(advnacedResults(Course,{
    path: 'bootcamp',
    select: 'name description'
} ) ,getCourses).post(protect,authorize('publisher'), addCourse)
router.route('/:id').get(getCourse).put(protect,authorize('publisher'), updateCourse).delete(protect,authorize('publisher'), deleteCourse)

module.exports=router
