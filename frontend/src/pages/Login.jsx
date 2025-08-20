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
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
            }
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    const testLogin = async () => {

        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/auth/test-protected`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)


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
                <Button variant="outlined" onClick={testLogin}>test</Button>
            </Box>
        </>
    )
}


export default Login