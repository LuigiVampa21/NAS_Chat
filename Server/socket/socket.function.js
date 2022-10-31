const axios = require("axios");

const socketFunctions = (io, socket) => {
  // const transport = socket.conn.transport.polling;
  // console.log(transport);
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
  // socket.conn.on("upgrade", () => {
  //   const upgradedTransport = socket.conn.transport.websocket; // in most cases, "websocket"
  //   console.log(upgradedTransport);
  // });
  socket.on("join_room", room => {
    socket.join(room);
    console.log("user joined the room" + room);
    // check if room exists
    socket.on("send_message", data => {
      socket.emit("new_message", {
        poster: data.poster,
        content: data.content,
        room,
        date: Date.now(),
      });
    });
  });

  socket.on("leave_room", room => {
    console.log("user left the room" + room);
  });

  socket.on("connect_error", err => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("end", function () {
    socket.disconnect(0);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
};
module.exports = socketFunctions;
