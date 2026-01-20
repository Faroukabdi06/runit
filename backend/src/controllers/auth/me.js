import prisma from "../../prisma.js";

const me = async (req,res) => {
    try {
        const authenticatedUser = req.user;
        if (!req.user) return res.status(401).json({ error: "Unauthorized" });

        const user = await prisma.user.findUnique({
            where:{id: authenticatedUser.id}
        })
        if(!user) return res.status(400).json({error:"user can't be found"});

        res.status(200).json({
            id:user.id,
            name:user.name,
            phone:user.phone,
            email:user.email,
            role:user.role,
            created:user.created
        })
    } catch (error) {
        res.status(400).json({error:"Could not find user"})

    }

};

export default me;