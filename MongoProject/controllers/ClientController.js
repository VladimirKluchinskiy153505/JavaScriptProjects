const Client = require('../models/Client')
const index = (req, res, next)=> {
    if (req.query.page && req.query.limit) {
        Client.paginate({}, {page: req.query.page, limit: req.query.limit})
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
        Client.find()
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
    let clientID = req.body.clientID
    Client.findById(clientID)
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
    let client = new Client({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        card: req.body.card
    })
    if(req.file){
        client.avatar = req.file.path
    }
    client.save()
        .then(response =>{
            res.json({
                message: 'Client Added Successfully'
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
    let clientID = req.body.clientID
    let updateData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        card: req.body.card
    }
    if(req.file){
        updateData.avatar = req.file.path
    }
    Client.findByIdAndUpdate(clientID, {$set: updateData})
        .then(()=>{
            res.json({
                message: 'Client updated successfully!'
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
    let clientID = req.body.clientID
    Client.findByIdAndDelete(clientID)
        .then(()=>{
            res.json({
                message: 'Client deleted successfully!'
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