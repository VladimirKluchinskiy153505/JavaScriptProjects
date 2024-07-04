const express = require('express')
const router = express.Router()
const TrainerController = require('../controllers/TrainerController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', TrainerController.index)
router.post('/show', TrainerController.show)
router.post('/store',authenticate, upload.single('avatar'), TrainerController.store)
//router.post('/store', upload.array('avatar[]'), TrainerController.store)
router.post('/update',authenticate, TrainerController.update)
router.post('/delete',authenticate, TrainerController.destroy)
module.exports = router