const io = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = http.createServer((request, response) => {
  if (request.method === "GET") {
    const filePath = path.join(__dirname, "index.html");

    readStream = fs.createReadStream(filePath);

    readStream.pipe(response);
  } else if (request.method === "POST") {
    let data = "";

    request.on("data", (chunk) => {
      data += chunk;
    });

    request.on("end", () => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);

      response.writeHead(200, { "Content-Type": "json" });
      response.end(data);
    });
  } else {
    response.statusCode = 405;
    response.end();
  }
});

const socket = io(app);
let userCount = 0;
socket.on("connection", function (socket) {
  console.log("New connection");
  let idClient = crypto.randomBytes(5).toString("hex");
  userCount++;

  socket.broadcast.emit("NEW_CONN_EVENT", {
    msg: `The new client ${idClient} connected`,
    id: idClient,
  });

  socket.on("CLIENT_MSG", (data) => {
    socket.broadcast.emit("SERVER_MSG", {
      msg: data.msg,
      id: idClient,
    });
  });

  //   socket.on("CLIENT_COUNTER", (data) => {
  //     socket.broadcast.emit("CLIENT_COUNTER", { counter: data.clientCount });
  //   });

  socket.broadcast.emit("CLIENT_COUNTER", { counter: userCount });

  socket.on("disconnect", function () {
    userCount--;
    socket.broadcast.emit("SERVER_MSG", {
      msg: `A user ${idClient} disconnected`,
      id: idClient,
    });
    socket.broadcast.emit("CLIENT_COUNTER", { counter: userCount });
  });
});
app.listen(3000, function () {
  console.log("listening port:3000");
});
