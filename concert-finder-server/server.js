import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 5050;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.listen(PORT, () => {
    console.log('Listening to port:', PORT);
});