const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')
const clubCardSchema = new Schema({
    card_name:{
        type: String
    },
    discount:{
        type: Number
    },
    avatar:{
        type:String
    }
}, {timestamps:true})
clubCardSchema.plugin(mongoosePaginate)
const ClubCard = mongoose.model('ClubCard', clubCardSchema)
module.exports = ClubCard