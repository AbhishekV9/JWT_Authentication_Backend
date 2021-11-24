const User=require("../model/user")

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