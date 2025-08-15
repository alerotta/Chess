import { Button } from "@mui/material"
import Board from "../components/Board"
import { useState } from "react"
import { useParams } from "react-router-dom"

function Game() {

    const { gameId } = useParams()
    const [isFlipped, setIsFlipped] = useState(false)
    const [isPlayerWhite, setIsPlayerWhite] = useState(true)

    return (

        <>
            <Board isFlipped={isFlipped} isPlayerWhite={isPlayerWhite} gameId={gameId} />
            <Button variant="contained" onClick={() => setIsFlipped(!isFlipped)}> flip</Button>
            <Button variant="contained" onClick={() => setIsPlayerWhite(!isPlayerWhite)}> change color</Button>
        </>
    )
}

export default Game