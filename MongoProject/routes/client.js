const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/ClientController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', ClientController.index)
router.post('/show', ClientController.show)
router.post('/store',authenticate, upload.single('avatar'), ClientController.store)
//router.post('/store', upload.array('avatar[]'), TrainerController.store)
router.post('/update',authenticate, ClientController.update)
router.post('/delete',authenticate, ClientController.destroy)
module.exports = router