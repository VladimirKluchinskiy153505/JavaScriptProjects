const Lesson = require('../models/Lesson')
const index = (req, res, next)=> {
    if (req.query.page && req.query.limit) {
        Lesson.paginate({}, {page: req.query.page, limit: req.query.limit})
            .then(response => {
                res.status(200).json({
                    response
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: "An error Occured: " + error
                })
            })
    }
    else{
        Lesson.find()
            .then(response => {
                res.json({
                    response
                })
            })
            .catch(error =>{
                res.json({
                    message: "An error Occured!"
                })
            })
    }
}
const show = (req, res, next) => {
    let lessonID = req.body.lessonID
    Lesson.findById(lessonID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An Error Occured"
            })
        })
}
//add new employee
const store = (req, res, next)=>{
    let lesson = new Lesson({
        subject_name: req.body.subject_name,
        price: req.body.price,
        date: req.body.date,
        gym: req.body.gym
    })
    if(req.file){
        lesson.avatar = req.file.path
    }
    lesson.save()
        .then(response =>{
            res.json({
                message: 'Lesson Added Successfully'
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error Occured!'
            })
        })
}

//update an employee
const update = (req, res, next)=>{
    let lessonID = req.body.lessonID
    let updateData = {
        subject_name: req.body.subject_name,
        price: req.body.price,
        date: req.body.date,
        gym: req.body.gym
    }
    Lesson.findByIdAndUpdate(lessonID, {$set: updateData})
        .then(()=>{
            res.json({
                message: 'Lesson updated successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}
//delete an employee
const destroy = (req, res, next)=>{
    let lessonID = req.body.lessonID
    Lesson.findByIdAndDelete(lessonID)
        .then(()=>{
            res.json({
                message: 'Lesson deleted successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })
}
module.exports = {
    index, show, store, update, destroy
}