require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const app = express();
const Server = require("socket.io").Server;
const http = require("http");

const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");
const roomRouter = require("./routes/roomRoute");
const authRouter = require("./routes/authRoute");
const callRouter = require("./routes/callRoute");
const notificationRouter = require("./routes/notificationRoute");
const authMiddleware = require("./middleware/authMiddleware");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");

const socketFunctions = require("./socket/socket.function");
const connectDB = require("./DB/connectDB");

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    credentials: true,
    // origin: ["http://localhost:4200"],
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to my chatApp Homies!!");
});
app.use("/api/v1/chatApp/auth", authRouter);

app.use(authMiddleware.checkToken);

app.use("/api/v1/chatApp/users", userRouter);
app.use("/api/v1/chatApp/rooms", roomRouter);
app.use("/api/v1/chatApp/messages", messageRouter);
app.use("/api/v1/chatApp/calls", callRouter);
app.use("/api/v1/chatApp/notifications", notificationRouter);

app.use(notFound);
app.use(errorHandler);

io.on("connection", socket => {
  socketFunctions(io, socket);
});

const port = process.env.PORT || 3001;
const startServer = async () => {
  try {
    await connectDB(process.env.DATABASE_URI);
    httpServer.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
