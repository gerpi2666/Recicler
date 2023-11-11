const express = require('express');
const router = express.Router();

const reciclerController=require('../Controllers/RecicleCenterController')

router.get('/',reciclerController.get);
router.post('/', reciclerController.create);
router.get("/:Id",reciclerController.getById)
router.put("/:Id",reciclerController.update)

module.exports=router