const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
import messageSender from "./Bot";
import getAllUsers from "./database/services/getAllUsers";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended: true}))

app.get("/", (req: any, res: any) => {
    res.send("Server is running");
});

app.post("/sendMessage", (req: any, res: any) => {
    const data = req.body;
    const dataArray = [data.serverID, data.channel, data.text, data.url, data.buttonText];
    console.log(dataArray);
    messageSender(dataArray, true)
    res.status(200).send("Message Sent")
})

app.get("/getAllUsers", async (req: any, res: any) => {
    const users = await getAllUsers();
    res.status(200).send(users);
});


app.listen(8080);
export default app;

