const express = require('express');
const router = express.Router();

const reciclerController=require('../Controllers/RecicleCenterController')

router.get('/',reciclerController.get)
router.get("/:Id",reciclerController.getById)

module.exports=router