import { Router } from "express";
import { register } from "../controller/authController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../validators/auth.js";

const router = Router();
router.post('/register', validate(registerSchema), register);

export default router;