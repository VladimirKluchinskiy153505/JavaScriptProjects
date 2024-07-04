const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')
const trainerSchema = new Schema({
    name:{
        type: String
    },
    designation:{
        type:String
    },
    salary:{
        type:Number
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    age:{
        type:Number
    },
    avatar:{
        type:String
    }
}, {timestamps:true})
trainerSchema.plugin(mongoosePaginate)
const Trainer = mongoose.model('Trainer', trainerSchema)
module.exports = Trainer