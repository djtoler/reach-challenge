const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const counter = require ("./routes/counter");
app.use(cors());
app.use(express.json());

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
    if (serverCounter == 3) {
      socket.to(data.room).emit("receive_message", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use("/", counter)
// app.get("/counter", async (req, res) => {
//   try {
//     const {serverCounter} = req.body
//     console.log(serverCounter);
//     console.log("counting on server");
//     res
//     .status(200)
//     .json({"counter":serverCounter})
//   }
//   catch (err) {
//     console.log("didnt count");
//     res.status(500).json({message: "Internal Server Error"})
//   }
// })

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
