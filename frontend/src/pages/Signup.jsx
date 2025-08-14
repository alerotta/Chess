import React, { useState } from "react"
import { Box, TextField, Button } from "@mui/material"
import axios from "axios"

function Signup() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/signup", {
                username: username,
                email: email,
                password: password
            })
            console.log("Success! Response:", response.data)
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    return (
        <>
            <Box>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button variant="outlined" onClick={handleSignup}>Signup</Button>
            </Box>
        </>
    )


}


export default Signup