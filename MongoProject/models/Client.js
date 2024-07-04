const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')
const clientSchema = new Schema({
    name:{
        type: String
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
    card:{
        type:String
    },
    avatar:{
        type:String
    }
}, {timestamps:true})
clientSchema.plugin(mongoosePaginate)
const Client = mongoose.model('Client', clientSchema)
module.exports = Client