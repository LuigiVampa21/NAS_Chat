require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const app = express();

const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");
const roomRouter = require("./routes/roomRoute");
const authRouter = require("./routes/authRoute");
const callRouter = require("./routes/callRoute");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");

const connectDB = require("./DB/connectDB");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    // origin: ["http://localhost:4200"],
    origin: ["http://localhost:51224"],
  })
);

// app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to my chatApp Homies!!");
});

app.use("/api/v1/chatApp/users", userRouter);
app.use("/api/v1/chatApp/rooms", roomRouter);
app.use("/api/v1/chatApp/auth", authRouter);
app.use("/api/v1/chatApp/messages", messageRouter);
app.use("/api/v1/chatApp/calls", callRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3001;
const startServer = async () => {
  try {
    await connectDB(process.env.DATABASE_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
