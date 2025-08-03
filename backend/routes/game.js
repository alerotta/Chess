const express = require("express")
const router = express.Router()
const { Chess } = require('chess.js')




router.get("/", (req, res) => {

    const chess = new Chess()
    res.send(chess.board())
})

module.exports = router