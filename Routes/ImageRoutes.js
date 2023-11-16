const express = require('express');
const router = express.Router();

const imgController=require('../Controllers/imgControllers')

router.post('/',imgController.UploadImage)

module.exports=router