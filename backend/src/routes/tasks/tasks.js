import express from "express"
import authenticate from "../../controllers/auth/authenticate.js"
import createTask from "../../controllers/tasks/createTask.js"
import getAllTasks from "../../controllers/tasks/getTasks.js"
import getTask from "../../controllers/tasks/getTask.js"
import updateTask from "../../controllers/tasks/updateTask.js"

const router = express.Router()

router.post("/tasks",authenticate,createTask)
router.get("/tasks",authenticate,getAllTasks)
router.get("/tasks/:id",authenticate,getTask)
router.patch("/tasks/:id/",authenticate,updateTask)

export default router