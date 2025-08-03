const { Chess } = require('chess.js')
const express = require("express");
const cors = require("cors")
const gameRouter = require("./routes/game")
const app = express();
const PORT = 8080;

const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use("/game", gameRouter);




app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})