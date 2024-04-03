import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import todoRoutes from './routes/todoRoutes';
import dotenv from 'dotenv';
import cors from "cors";
const app = express();
dotenv.config();
app.use(bodyParser.json());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Adjusted this to client's origin
      methods: ["GET", "POST"]
    }
  });

export { io }; // Export the io instance

const mongoURI = process.env.DB_URI;
const PORT = process.env.PORT || 5000;
const whitelist = process.env.whiteListedOrigins;

if (!PORT || !mongoURI || !whitelist) {
    console.error('Error: PORT , DB_URL or whitelist environment variables are not defined.');
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)

app.use(bodyParser.json());

const corsOptions = {
	origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
		if (origin && whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(null, true);
		}
	}
};

app.use('/api', cors(corsOptions), todoRoutes);

io.on('connection', (socket: any) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
