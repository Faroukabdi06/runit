import prisma from "../../prisma.js";

const  getTask = async (req,res) => {
    try {
        const {id} = req.params;
        if(!req.user) return res.status(401).json({error:"Unauthorized"});

        let task = await prisma.task.findFirst({
            where:{ id }
        })
        if (!task) return res.status(404).json({ error: "Task not found" });

        res.status(200).json({data:task})

    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }

};

export default getTask;