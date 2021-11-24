const express=require("express");
const router=express.Router();

const userController=require("../controller/userController");
router.get('/register',userController.registerUser);

module.exports=router;