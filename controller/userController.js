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
            })
        }
        user=await User.create(req.body);
        return res.status(200).json({
            message:"User Registered Successfully",
            registered:true,
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
          const {email,password}=req.query;
          //finding User on the basis of email
          let user= await User.findOne({email:email});
          //if entered password dosen't match with account's password then sending response
          if(!user || user.password !== password){
              return res.status(401).json({
                message:"Invalid Username or Password"              
              })
          }
  
          //otherwise signing in the User and return a token that expires in 1 hr
          return res.status(200).json({
            message:"Sign_In Successfull",
            token:jwt.sign(user.toJSON(),'Abhishek99vumonicDatalabs99',{ expiresIn: '3600000'}),
            user
          })
    } catch (error) {
        //catching errors
        console.log(error)
        return res.status(500).json({
            message:"Iternal Server Error"
          })
        }
  }

  module.exports.authenticateUser= async function(req,res){
      try{
           
        const userJWTToken = req.headers.authorization;
        //splitting it into arrays on space. [0]=bearer [1]="token"
        const token = userJWTToken.split(' ');
        
        //decoding token
        const decoded = jwt.verify(token[1],'Abhishek99vumonicDatalabs99');
        
        //finding doctor with the id from decoded
        const user=await User.findById(decoded._id);
        if(!user){
            return res.json('401',{
                message:"user dosen't Exist"
            });
        }
        return res.status(200).json({
            isAuthorized:true
        })

      }catch(error){
          console.log(error);
          return res.json(500,{
            message:'Internal Server Error'
        });
      }
  }