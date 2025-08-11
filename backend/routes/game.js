const express = require("express")
const router = express.Router()
const { Chess } = require('chess.js')

router.use(express.json());

const chess = new Chess()

router.get("/", (req, res) => {
    res.send(chess.board())
})

router.post("/move", (req, res) => {
    const move_obj = chess.move(req.body)
    if (chess.isCheckmate()) {
        move_obj.isCheckmate = true
    }
    else {
        move_obj.isCheckmate = false
    }

    res.send(move_obj)
})

module.exports = router