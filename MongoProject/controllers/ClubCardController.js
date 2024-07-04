const ClubCard = require('../models/ClubCard')
const index = (req, res, next)=> {
    if (req.query.page && req.query.limit) {
        ClubCard.paginate({}, {page: req.query.page, limit: req.query.limit})
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
        ClubCard.find()
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
    let clubCardID = req.body.clubCardID
    ClubCard.findById(clubCardID)
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
    let clubCard = new ClubCard({
        card_name: req.body.card_name,
        discount: req.body.discount,
    })
    if(req.file){
        clubCard.avatar = req.file.path
    }
    clubCard.save()
        .then(response =>{
            res.json({
                message: 'ClubCard Added Successfully'
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
    let clubCardID = req.body.clubCardID
    let updateData = {
        card_name: req.body.card_name,
        discount: req.body.discount,
    }
    ClubCard.findByIdAndUpdate(clubCardID, {$set: updateData})
        .then(()=>{
            res.json({
                message: 'ClubCard updated successfully!'
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
    let clubCardID = req.body.clubCardID
    ClubCard.findByIdAndDelete(clubCardID)
        .then(()=>{
            res.json({
                message: 'ClubCard deleted successfully!'
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