import { success } from "zod";
import User, { createUser, getUserByEmail } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateOtp, otpExpiry } from "../utils/otp.js";
import { sendOtpEmail } from "../config/mailer.js";

// register a new user
export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await getUserByEmail(email);
    if(exists) throw new AppError('Email is already registered', 409, 'EMAIL_EXISTS');

    const otp = generateOtp();
    const user = await User.create({
        name, email, password, otpHash: otp, otpExpires: otpExpiry()
    });

    // to send otp
    await sendOtpEmail(email, otp, 'Verify Authentication OTP');

    return res.status(201).json({
        success: true,
        message: "User Created Successfully",
    });
});