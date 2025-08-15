const express = require("express")
const router = express.Router()
const { Chess } = require('chess.js')

router.use(express.json());

const games = {}

router.post("/new", (req, res) => {
    const gameId = Math.random().toString(36)
    games[gameId] = new Chess()
    res.json({ gameId })
})

router.get("/:gameId", (req, res) => {
    const game = games[req.params.gameId]
    if (!game) {
        return res.status(404).json({ error: "Game not found" })
    }
    res.send(game.board())
})


router.post("/:gameId/move", (req, res) => {
    const game = games[req.params.gameId]
    if (!game) {
        return res.status(404).json({ error: "Game not found" })
    }
    const move_obj = game.move(req.body)
    if (!move_obj) {
        return res.status(400).json({ error: "Invalid move" })
    }
    move_obj.isCheckmate = game.isCheckmate()
    res.send(move_obj)
})

module.exports = router