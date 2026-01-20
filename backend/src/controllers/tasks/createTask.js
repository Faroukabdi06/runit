import prisma from "../../prisma.js"


const createTask = async (req,res) => {
    try {
        if (!req.user) return res.status(401).json({ error: "Unauthorized" });

        if(req.user.role !== "USER") return res.status(403).json({error:"Action Forbidden"});

        const {description, latitude, longitude} = req.body;
        if(!description || latitude==null || longitude==null) return res.status(400).json({error:"Missing Fields"});

        const lat = parseFloat(latitude)
        const lng = parseFloat(longitude)
        if(isNaN(lat) || isNaN(lng)) return res.status(400).json({error:"Invalid coordinates"});

        const newTask = await prisma.task.create({
            data:{
                description,
                latitude:lat,
                longitude:lng,
                userId:req.user.id
            }
        });

        res.status(201).json({
            msg:"Task created successfully",
            task:newTask
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
};

export default createTask;