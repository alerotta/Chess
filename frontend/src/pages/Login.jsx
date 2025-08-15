import React, { useState } from "react"
import { Box, TextField, Button } from "@mui/material"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username: username,
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
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
            </Box>
        </>
    )
}


export default Login