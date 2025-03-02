import express from 'express';
import userRouter from './routes/user.routes.js';

const app = express();

import swagerUI from 'swagger-ui-express';
import swagerDocumentation from './swagger.json' assert { type: 'json' };

app.use(express.json());
const PORT = 3000;

app.use('/doc', swagerUI.serve, swagerUI.setup(swagerDocumentation));
app.use("/api", userRouter);

app.listen(PORT, () => {
    console.log("Express.js está corriendo en el puerto " + PORT);
});