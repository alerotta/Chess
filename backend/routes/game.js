const express = require("express")
const router = express.Router()
const { Chess } = require('chess.js')

router.use(express.json());

const chess = new Chess()

router.get("/", (req, res) => {
    res.send(chess.board())
})

router.post("/move", (req, res) => {
    res.send(chess.move(req.body))
})

module.exports = router