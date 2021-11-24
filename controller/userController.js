const User=require("../model/user");
const jwt=require('jsonwebtoken');

module.exports.registerUser=async function(req,res){
    
    try{
        let email=req.body.email;
        let user=await User.findOne({email:email})
        if(user){
            return res.status(200).json({
                message:"User Already Exits",
                registered:true,
                user
            })
        }
        console.log("hiiii")
        user=await User.create(req.body);
        return res.status(200).json({
            message:"User Registered Successfully",
            registered:true,
            user
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"User Registeration Failed",
            registered:false
        })
    }
}

module.exports.createsession=async function(req,res){
    try {
          //finding User on the basis of email
          let user= await User.findOne({email:req.body.email});
          //if entered password dosen't match with account's password then sending response
          if(!user || user.password !== req.body.password){
              return res.status(422).json({
                message:"Invalid Username or Password"
              })
          }
  
          //otherwise signing in the User and return a token that expires in 1 hr
          return res.status(200).json({
            message:"Sign_In Successfull",
            token:jwt.sign(user.toJSON(),'Abhishek99HospitalAPI',{ expiresIn: '3600000'})
          })
    } catch (error) {
        //catching errors
        console.log(error)
        return res.status(500).json({
            message:"Iternal Server Error"
          })
        }
  }