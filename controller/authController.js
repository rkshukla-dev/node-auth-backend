import User, { getUserByEmail } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// register a new user
export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const exists = await getUserByEmail(email);
    // if(exists) return 

    return res.status(200).json({ name, email, password });
});