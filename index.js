import express from "express";
import cors from "cors";
import { authUserRouter } from "./src/application/routes/authUser.routes.js";
import { hobbiesRouter } from "./src/application/routes/hobbies.routes.js";
import swaggerUI from "swagger-ui-express";
import fs from "fs";

const app = express();
const PORT = 3000;

const swaggerDocumentation = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

app.use(cors()); 
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));


app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use("/api/authusers", authUserRouter);
app.use("/api/hobbies", hobbiesRouter);


app.listen(PORT, () => {
  console.log("Express.js está corriendo en el puerto " + PORT);
});
