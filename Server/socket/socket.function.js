const axios = require("axios");

const socketFunctions = (io, socket) => {
  console.log("new connection " + socket.id);

  socket.on("login", data => {
    console.log("----------------------------------------");
    console.log(data.email, data.password, "ligne 7");
    console.log("----------------------------------------");
    const { email, password } = data;
    axios
      .post("http:/localhost:3001/api/v1/chatApp/auth/login", {
        email,
        password,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  });
};

loadEvents = () => {
  socket.on("join", data => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit(`${data.user} joined`);

    socket.on("message", data => {
      io.in(data.room).emit("new message", {
        user: data.user,
        message: data.message,
        time: data.time,
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
};
module.exports = socketFunctions;
