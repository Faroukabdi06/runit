import jwt from "jsonwebtoken"

const secretkey = process.env.JWT_SECRET_KEY
if (!secretkey) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

const authenticate = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({error:"authorization header is missing"});
        if (!authHeader.startsWith("Bearer ")) return res.status(401).json({ error: "Invalid authorization format" });


        const token = authHeader.split(" ")[1]
        if(!token) return res.status(400).json({error:"token is missing"});

        const decoded = jwt.verify(token,secretkey);
        req.user = decoded
        next()

    } catch (error) {
        res.status(401).json({error:"Invalid or expired token"})

    }
};

export default authenticate;