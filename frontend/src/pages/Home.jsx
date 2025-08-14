
import { Stack } from "@mui/material"
import { Button } from "@mui/material"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate()

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