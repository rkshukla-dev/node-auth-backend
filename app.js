import express from 'express';
import cors from "cors";
import { env } from './config/env.js';
import helmet from 'helmet';
import morgan from 'morgan';

export const app = express();
app.disable("x-powered-by");    // Hide unnecessary technology information from HTTP responses.

// middleware
app.use(helmet());  // secure an application by setting various HTTP security headers, reducing risks such as clickjacking
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));
if (env.nodeEnv !== 'test') app.use(morgan('dev'));    // HTTP request logger middleware.

app.get('/health', (req, res) => res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() }));

// app.listen(env.port, () => { console.log(`Server running on port ${env.port}`) });