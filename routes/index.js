const express=require("express");
const router=express.Router();
const passport=require("passport");

const userController=require("../controller/userController");
router.post('/register',userController.registerUser);
router.get('/login',userController.createsession);
router.get('/authenticate',passport.authenticate('jwt',{ session:false }),userController.authenticateUser);

module.exports=router;