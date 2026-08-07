import 'dotenv/config';

export const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT || 5001),
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    mongoUri: process.env.MONGO_URI,
}