import express from 'express'
import cors from 'cors';
import 'dotenv/config';

import loginRoutes from "./routes/loginRoute.js";''
import callbackRoutes from "./routes/callbackRoute.js";
import refreshRoutes from "./routes/refreshRoutes.js";
import userDataRoutes from "./routes/userDataRoutes.js";


const app = express();
const { CORS_ORIGIN } = process.env

app.use(cors( { origin: CORS_ORIGIN, credentials: true, } ));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 5050;

app.use("/login", loginRoutes);
app.use("/callback", callbackRoutes);
app.use("/refresh", refreshRoutes);
app.use("/user", userDataRoutes);


app.get("/", (_req, res) => {
    res.send("hello")
});

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});