import express from "express";
import userRouter from "./routes/user.routes.js";
import swaggerUI from "swagger-ui-express";
import fs from "fs";

const app = express();
const PORT = 3000;
const swaggerDocumentation = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));
app.use(express.json());
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log("Express.js está corriendo en el puerto " + PORT);
});
