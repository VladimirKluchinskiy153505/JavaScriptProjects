const Trainer = require('../models/Trainer')
    const index = (req, res, next)=> {
        if (req.query.page && req.query.limit) {
            Trainer.paginate({}, {page: req.query.page, limit: req.query.limit})
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
            Trainer.find()
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
        let trainerID = req.body.trainerID
        Trainer.findById(trainerID)
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
    let trainer = new Trainer({
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    if(req.file){
        trainer.avatar = req.file.path
    }
    // if(req.files){
    //     let path = ''
    //     req.files.forEach(function(files, index, arr){
    //         path = path +files.path+','
    //     })
    //     path = path.substring(0, path.lastIndexOf(","))
    //     trai.avatar = path
    // }
    trainer.save()
        .then(response =>{
            res.json({
                message: 'Trainer Added Successfully'
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
    let trainerID = req.body.trainerID
    let updateData = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    Trainer.findByIdAndUpdate(trainerID, {$set: updateData})
        .then(()=>{
            res.json({
                message: 'Trainer updated successfully!'
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
    let trainerID = req.body.trainerID
    Trainer.findByIdAndDelete(trainerID)
        .then(()=>{
            res.json({
                message: 'Trainer deleted successfully!'
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