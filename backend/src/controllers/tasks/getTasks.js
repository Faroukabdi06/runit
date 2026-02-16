import prisma from "../../prisma.js";


const getAllTasks = async (req,res) => {
    try {
        if(!req.user) return res.status(401).json({error:"Unauthorized"});

        let tasks;
        if (req.user.role === "ADMIN"){
            tasks = await prisma.task.findMany();
        }
        else if (req.user.role === "USER"){
            tasks = await prisma.task.findMany({
                where :{
                    userId:req.user.id
                }
            })
        }
        else if (req.user.role === "RUNNER"){
            tasks = await prisma.task.findMany({
                where :{
                    runnerId:req.user.id
                }
            })
        }
        else return res.status(403).json({error:"Invalid Role"})

        res.status(200).json({data:tasks})

    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }

}

export default getAllTasks; 