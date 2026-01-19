import prisma from "../../prisma.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secretkey = process.env.JWT_SECRET_KEY
if (!secretkey) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({msg:"email and password required"});

        const user = await prisma.user.findUnique({
            where:{email}
        })
        if(!user) return res.status(400).json({msg:"Invalid credantials"});

        const validpassword = await bcrypt.compare(password, user.password)
        if (!validpassword) return res.status(400).json({msg:"Invalid credantials"});

        const token = jwt.sign({id:user.id, role:user.role},secretkey,{expiresIn:'1h'})

        res.status(200).json({"msg":"login successfull",token})
    } catch (error) {
        res.status(500).json({error:"Internal sever error"})
    }
}

export default login;