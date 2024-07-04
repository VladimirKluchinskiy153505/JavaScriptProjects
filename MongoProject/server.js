const express = require('express')
const cors = require('cors');
const mongoose= require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const ClientRoute = require('./routes/client')
const ClubCardRoute = require('./routes/clubCard')
const LessonRoute = require('./routes/Lesson')
const TrainerRoute = require('./routes/trainer')
const AuthRoute = require('./routes/auth')
mongoose.connect("mongodb://127.0.0.1:27017/mongo_db", {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open', ()=>{
    console.log('Database Connection Established')
})
const app = express()
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
app.use('/api/client', ClientRoute)
app.use('/api/clubCard', ClubCardRoute)
app.use('/api/lesson', LessonRoute)
app.use('/api/trainer', TrainerRoute)
app.use('/api', AuthRoute)