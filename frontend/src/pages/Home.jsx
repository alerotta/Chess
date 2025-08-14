
import { Stack } from "@mui/material"
import { Button } from "@mui/material"
import { Typography } from "@mui/material"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate()

    const fetchAPI = async () => {

        const response = await axios.get("http://localhost:8080/game")
        console.log("Success! Response:", response.data);

    };

    useEffect(() => {
        fetchAPI();
    }, [])

    return (
        <>
            <Stack direction={"column"} spacing={1} >
                <Typography variant="h3" fontWeight={400}>SALICI CHESS</Typography>
                <Button variant="outlined" onClick={() => navigate("/login")} > log in</Button>
                <Button variant="outlined" onClick={() => navigate("/signup")} > sign up</Button>

            </Stack >

        </>
    )
}

export default Home