import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { authUserRouter } from "./src/application/routes/authUser.routes.js";
import { hobbiesRouter } from "./src/application/routes/hobbies.routes.js";
import { usersRouter } from "./src/application/routes/users.routes.js";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import { socketErrorHandler } from "./src/infrastructure/blobstorage/blobStorage.js";



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;
const swaggerDocumentation = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

// Middlewares
app.use(cors()); 
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));


app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use("/api/authusers", authUserRouter);
app.use("/api/hobbies", hobbiesRouter);
app.use("/api/users",usersRouter);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado: " + socket.id);

  socket.on("join_room", socketErrorHandler(async (room) => {
    socket.join(room);
    console.log(`Usuario unido a la sala ${room}`);
  }));

  socket.on("send_message", socketErrorHandler(async ({ room, body }) => {
    io.to(room).emit("receive_message", body);
  }));

  socket.on("send_match", socketErrorHandler(async ({ room, body }) => {
    io.to(room).emit("receive_match", body);
  }));

  socket.on("send_messages", socketErrorHandler(async ({ room, body }) => {
    io.to(room).emit("receive_messages", body);
  }));

  socket.on("disconnect", () => {
    console.log("Cliente desconectado: " + socket.id);
  });
});
server.listen(PORT, () => {
  console.log("Express.js está corriendo en el puerto " + PORT);
});
