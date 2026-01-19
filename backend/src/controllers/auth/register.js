import prisma from "../../prisma.js";
import bcrypt from "bcrypt"

const signup = async (req,res) => {
    try {
        const {name,email,phone,password} = req.body;
        if(!name || !email || !phone || !password){
            return res.status(400).json({msg:"Name, email, phone, and password are required"});
        };

        const existing = await prisma.user.findFirst({
            where:{OR: [{email},{phone}]}
        });
        if (existing) return res.status(400).json({error:"user already exists"});

        const passwordHashed =await bcrypt.hash(password,10);

        const user = await prisma.User.create({
            data : {name,email,phone,password:passwordHashed}
        });

        res.status(201).json({msg:"Signup was successfull"});


    } catch (error) {
        res.status(500).json({error:"Internal sever error"});
    }
};

export default signup;