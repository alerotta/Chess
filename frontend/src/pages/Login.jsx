import React, { useState } from "react"
import { Box, TextField, Button, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [serverError, setServerError] = useState("")

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username: username,
                password: password
            })
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
            }
            navigate("..")

        } catch (error) {
            setServerError(error.response?.data?.message || "login failed")
        }
    }

    /*

    const testLogin = async () => {

        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/auth/test-protected`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)


    }
        */

    return (
        <>

            <Box>
                <Stack>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        required
                        error={!!serverError}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        error={!!serverError}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    {serverError && (
                        <Typography color="error" sx={{ mb: 2 }}>{serverError}</Typography>
                    )}
                    <Button variant="outlined" onClick={handleLogin}>Login</Button>
                </Stack>
            </Box>

        </>
    )
}


export default Login