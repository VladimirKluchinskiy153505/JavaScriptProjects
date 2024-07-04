const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')
const lessonSchema = new Schema({
    subject_name:{
        type: String
    },
    price:{
        type:Number
    },
    date:{
        type:Date,
        default: Date.now
    },
    gym:{
        type:String
    },
    avatar:{
        type:String
    }
}, {timestamps:true})
lessonSchema.plugin(mongoosePaginate)
const Lesson = mongoose.model('Lesson', lessonSchema)
module.exports = Lesson