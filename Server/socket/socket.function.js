const axios = require("axios");

const socketFunctions = (io, socket) => {
  console.log("new connection " + socket.id);

  socket.on("login", data => {
    const { email, password } = data;
    axios
      .post("http:/localhost:3001/api/v1/chatApp/auth/login", {
        email,
        password,
      })
      .then(res => {
        loadEvents(socket);
      })
      .catch(err => console.log(err));
  });
};

loadEvents = socket => {
  socket.on("join_room", room => {
    socket.join(room);
    console.log("user joined the room" + room);
    socket.on("send_message", data => {
      // io.to(room).emit("new_message", {
      //   poster: data.poster,
      //   content: data.content,
      //   date: Date.now(),
      // });

      socket.emit("new_message", {
        poster: data.poster,
        content: data.content,
        date: Date.now(),
      });
      console.log(data);
    });
  });

  socket.on("leave_room", room => {
    console.log("user left the room" + room);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
};
module.exports = socketFunctions;
