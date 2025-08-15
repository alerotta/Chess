
import { Stack } from "@mui/material"
import { Button } from "@mui/material"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

function Home() {

    const navigate = useNavigate()


    const handleNewGame = async () => {
        const response = await axios.post(`${API_URL}/game/new`)
        const gameId = response.data.gameId
        navigate(`/game/${gameId}`)
    }

    return (
        <>
            <Stack direction={"column"} spacing={1} >
                <Typography variant="h3" fontWeight={400}>SALICI CHESS</Typography>
                <Button variant="outlined" onClick={() => navigate("/login")} > log in</Button>
                <Button variant="outlined" onClick={() => navigate("/signup")} > sign up</Button>
                <Button variant="outlined" onClick={handleNewGame} > play</Button>


            </Stack >

        </>
    )
}

export default Home