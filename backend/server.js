const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 8080;

const corsOptions = {
    otigin: "http://localhost:5173",
};

app.use(cors(corsOptions));


app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "banana"] });
});


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})