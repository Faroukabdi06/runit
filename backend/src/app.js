import express, { json } from "express"
import cors from "cors"

import authRoutes from "./routes/auth/auth.js";



const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);


app.get("/", (req,res)=>{
    res.send("API IS RUNNING")
})

export default app