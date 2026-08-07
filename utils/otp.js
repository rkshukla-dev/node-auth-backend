import crypto from 'crypto';

// generate otp
export const generateOtp = () => crypto.randomInt(100000, 1000000).toString();

// otp expiry -> 10min
export const otpExpiry = () => new Date(Date.now() + 10 * 60 * 1000);

