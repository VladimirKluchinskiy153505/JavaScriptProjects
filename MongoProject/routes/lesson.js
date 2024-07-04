const express = require('express')
const router = express.Router()
const LessonController = require('../controllers/LessonController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', LessonController.index)
router.post('/show', LessonController.show)
router.post('/store',authenticate, upload.single('avatar'), LessonController.store)
//router.post('/store', upload.array('avatar[]'), TrainerController.store)
router.post('/update',authenticate, LessonController.update)
router.post('/delete',authenticate, LessonController.destroy)
module.exports = router