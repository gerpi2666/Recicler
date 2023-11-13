const express = require('express');
const router = express.Router();

const ordenController=require('../Controllers/OrdenController')

router.get('/',ordenController.get)
router.get("/:Id",ordenController.getById)
router.get('/center/:Id',ordenController.getByCenter)
router.get('/user/:Id',ordenController.getByCenter)
module.exports=router