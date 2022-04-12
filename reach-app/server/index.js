const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./configs/database');
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require('body-parser')
const { Server } = require("socket.io");
const users = require('./routes/users');
const {notFound, errorHandler} = require('./middleware/middleware');

dotenv.config();
connectDB();

// 3rd party middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(express.json());

// application level middleware
app.get('/', (req, res) => res.send("endpoint is working!"))
app.use('/user', users);

// error handling middleware
app.use(notFound)
app.use(errorHandler)

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let serverCounter;

io.on("connection", (socket) => {

  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    serverCounter = 0;
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
    console.log(serverCounter);
  });

  socket.on("send_message", (data) => {
    serverCounter++
    socket.to(data.room).emit("receive_message", data);
    console.log(serverCounter);
    if (serverCounter == 10) {
      console.log("gameOver");
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(
  3001,
  console.log(`Server running on PORT 3001`)
);

