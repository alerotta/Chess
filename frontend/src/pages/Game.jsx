import { Button } from "@mui/material"
import Board from "../components/Board"
import { useState } from "react"

function Game() {

    const [isFlipped, setIsFlipped] = useState(false)

    return (

        <>
            <Board isFlipped={isFlipped} />
            <Button variant="contained" onClick={() => setIsFlipped(!isFlipped)}> flip</Button>
        </>
    )
}

export default Game