let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
    return io;
  },
  getIO: () => {
    // console.log("outside scope", io);
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
