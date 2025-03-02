import express from 'express';
import userRouter from './routes/user.routes.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/api", userRouter);

app.listen(PORT, () => {
    console.log("Express.js está corriendo en el puerto " + PORT);
});
