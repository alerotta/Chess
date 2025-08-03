import React from "react"
import { Stack } from "@mui/material"
import { Button } from "@mui/material"
import { Typography } from "@mui/material"
import { useEffect } from "react"
import axios from "axios"

function Home() {

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
                <Button variant="outlined"> log in</Button>
                <Button variant="outlined"> sign up</Button>

            </Stack>

        </>
    )
}

export default Home