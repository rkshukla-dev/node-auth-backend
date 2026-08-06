import { app } from "./app.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { env } from "./config/env.js";

let server;

const start = async () => {
    try {
        // Connect to mongoDB first
        await connectDB();

        // Start the Express server
        server = app.listen(env.port, () => { console.log(`Server running on port ${env.port}`) });
        
    } catch (error) {
        console.error("Startup failed:", error); 
        process.exit(1);
    }
}

const shutdown = async (signal) => {
    console.log(`${signal}: shutting down`);
    if(server) {
        await server.close(async () => {
            await disconnectDB();
        })
    }
    process.exit(0);    // 0 -> terminates the node process successfully
}

// process is a built-in Node.js global object.
// It gives you information and control over the currently running Node.js process.

// Signal Terminate
process.on('SIGTERM', () => shutdown('SIGTERM'));   // Signal Interrupt.

// Signal Interrupt => can close the server while development using CTRL + C
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('uncaughtException', (error) => {    
  console.error('UNCAUGHT EXCEPTION', error);
  shutdown('uncaughtException');
})
process.on('unhandledRejection', (error) => {
  console.error('UNCAUGHT EXCEPTION', error);
  shutdown('unhandledRejection');
})

start().catch((error) => {
    console.log("Startup Failed", error);
    process.exit(1);    // 1 -> terminates the node process with Error/Failure
})