import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup =async(req, res , next)=>{
    const {username , email , password} = req.body ;
    const hashedPassword = bcryptjs.hashSync(password ,10);
    const newUser = new User({username , email , password: hashedPassword})
    try {
        await newUser.save();
    res.status(201).json({success:true , message :"user Creates successfully"});
    } catch (error) {
         next(error);
        // return res.status(500).json('Internal server error');   
     }
    
}


export const signin = async(req, res, next)=>{
     const{email , password} = req.body;
     try {
        const validEmail = await User.findOne({email});
        if(!validEmail){
            return res.status(400).json({success: false , message: 'Invalid Details'});
        }
        const validPassword = bcryptjs.compareSync(password , validEmail.password);
        if(!validPassword) return res.status(400).json({success: false , message: 'Invalid Password'}) ;   

        const token = jwt.sign({id:validEmail._id},process.env.JWT_SECRET );
        console.log(token);
        
        const {password : pass ,...rest  } = validEmail._doc;
        res.cookie('acess_token' , token,{httpOnly: true  }).status(200).json({success: true , data: rest});

     } catch (error) {
        next(error);
     }
}

export const google =async (req, res,next)=>{
    try {
        const user = await User.findOne({email :req.body.email})
        if(user){
           const token = jwt.sign({id:user.id  } , process.env.JWT_SECRET);
           const {password: pass, ...rest } = user._doc;
           res.cookie('access_token' , token ,{httpOnly:true}).status(200).json(rest);
        }else{
            const generatePassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword,10);
            const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4) , email: req.body.email , password : hashedPassword , avatar :req.body.photo});  
            await newUser.save(); 

            const token = jwt.sign({id:newUser.id  } , process.env.JWT_SECRET);
            const {password: pass, ...rest } = newUser._doc;
            res.cookie('access_token' , token ,{httpOnly:true}).status(200).json(rest);
       }

    } catch (error) {
        next(error);
    }
}

export const signOut = async(req ,res , next)=>{
     try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged Out');
     } catch (error) {
        next(error);
     }
}