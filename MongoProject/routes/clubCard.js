const express = require('express')
const router = express.Router()
const ClubCardController = require('../controllers/ClubCardController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', ClubCardController.index)
router.post('/show', ClubCardController.show)
router.post('/store',authenticate, upload.single('avatar'), ClubCardController.store)
//router.post('/store', upload.array('avatar[]'), TrainerController.store)
router.post('/update',authenticate,upload.single('avatar'), ClubCardController.update)
router.post('/delete',authenticate, ClubCardController.destroy)
module.exports = router