import express from "express"
import login from "../../controllers/auth/login.js"
import authenticate from "../../controllers/auth/authenticate.js";
import me from "../../controllers/auth/me.js";
import signup from "../../controllers/auth/register.js"

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, me);

export default router;