const express = require('express');
const router = express.Router();
const imgController=require('../Controllers/imgControllers')

router.get('/:fileName',imgController.getImage)
router.post('/',imgController.upload,imgController.UploadImage)

module.exports=router