const express = require('express');
const router = express.Router();

const reciclerController=require('../Controllers/RecicleCenterController')

router.get('/',reciclerController.get);
router.post('/', reciclerController.create);
router.get("/:Id",reciclerController.getById)
router.get('/user/:Id',reciclerController.getByUser)
router.put("/:Id",reciclerController.update)

module.exports=router