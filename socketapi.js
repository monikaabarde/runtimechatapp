const io = require("socket.io")();
const socketapi = {
  io: io,
};

var connections = [];
var connectionsId = [];


// Add your socket.io logic here!
io.on("connection", function (socket) {

  io.emit("onlineusers", connections);

  socket.on("disconnect", function () {
    let indexOfDisconnectedUser = connectionsId.indexOf(socket.id);
    connections.splice(indexOfDisconnectedUser, 1);
    connectionsId.splice(indexOfDisconnectedUser, 1);
   io.emit("onlineusers", connections);

    console.log(connections);
    console.log(connectionsId);
  })
  // // console.log("A user connected");
  // socket.on("msg", function (data) {
  //   // console.log(data)
  //   io.emit("msg" , data);
  // })

  socket.on("naam", function (data) {
    connections.push(data);
    connectionsId.push(socket.id);
    io.emit("onlineusers", connections);

    
    console.log(connections);
    console.log(connectionsId);
    // console.log(onlineusers);
  })

    
//     socket.on("disconnect", function () {
//         console.log("Disconnected user !")
//     })
    socket.on("msg", function (data) {
      let connectionkanaam = connections[connectionsId.indexOf(socket.id)];
      io.emit("msg", { connections: connectionkanaam, msg: data });
    });
});
// end of socket.io logic


// Add your socket.io logic here!
// io.on("connection", function (socket) {
//   connections++;
//   socket.on("disconnect", function () {
//     connections--;
//     console.log(`a user disconnected, total : ${connections}`);
//   });
//   // console.log("A user connected");
//   console.log(`a user connected, total : ${connections}`);
// });

module.exports = socketapi;
