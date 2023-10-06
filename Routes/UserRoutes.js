const express = require('express');
const router = express.Router();

const userController=require('../Controllers/UserControllerController')

router.get('/',userController.get)
router.get("/:Id",userController.getById)

module.exports=router