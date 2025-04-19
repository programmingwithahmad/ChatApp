import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import {createServer} from 'http';
import { Server } from 'socket.io';
import cookieParser from "cookie-parser";
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
import { initSocket } from './socket/index.js';


//configure env
dotenv.config();   

//database config
connectDB();

//rest object
const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN, // allow frontend origin
    }
  })
 
//middleware
app.use(cors({
    origin: process.env.ORIGIN, // frontend origin
    credentials: true               // allow cookies and auth headers
  }))
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


// API Routes
app.use("/api/auth", authRoute);
app.use("/api/chat", messageRoute);

 
// rest api            
app.get('/', (req, res) => {
    res.send('Welcome to ChatApp');
})  

initSocket(io)


//PORT
const PORT = process.env.PORT || 3000; 


// Start server
server.listen(PORT ,() => {
    console.log(`Server is running on port ${PORT}`.bgYellow?.white);
})


// io.on('connection', (socket) => {
//   console.log(`Socket ${socket.id} connected`);

//   // socket.on('sendMessage', (message) => {
//   //   io.emit('message', message);
//   // });

//   socket.emit('ahmad', 'How Are You')

//   socket.on('disconnect', () => {
//     console.log(`Socket ${socket.id} disconnected`);
//   });
// });