const users = require('../Modal/userModel')
const jwt = require('jsonwebtoken')

//register

exports.register =async (req,res)=>{
    console.log("Inside Register request")
    const{firstname,lastname,address,email,gender,mobile,password,dateofbirth,course}=req.body
    console.log(firstname,lastname,address,email,gender,mobile,password,dateofbirth,course);
    try{
    //check email is present
    const existingUser= await users.findOne({email})
    //if email is present then existing user
    if(existingUser){
        res.status(406).json("User Already exists!!!")
    }else{
    //else store data to db
    const newUser = new users({
        firstname,lastname,address,email,gender,mobile,password,dateofbirth,course
    })

    //
    await newUser.save()
    res.status(200).json(newUser)
}
    }catch(err){
        res.status(401).json(err)
    }
  
}


//login
exports.login = async (req,res)=>{
    console.log("inside login function");
    //get email password from req
    const {email,password}=req.body
    console.log(email,password);
    try{
        //check email is present in db or not
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //user can login
           //generate token  -{token is created for authorization}
            const token =jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({
                
                existingUser,
                token
            })
        }else{
            //incorrect email/ password
            res.status(404).json("incorrect email/password")
        }

    }catch(err){
        res.status(401).json(err)

    }
}