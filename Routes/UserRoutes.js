const express = require('express');
const router = express.Router();

const userController=require('../Controllers/UserController')

router.get('/',userController.get)
router.get('/center', userController.getUserWithoutCenter)
router.get('/client',userController.getClients)
router.get("/:Id",userController.getById)

module.exports=router