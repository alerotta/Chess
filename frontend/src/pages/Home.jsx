import React from "react"
import { Stack } from "@mui/material"
import { Button } from "@mui/material"
import { Typography } from "@mui/material"
function Home() {
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