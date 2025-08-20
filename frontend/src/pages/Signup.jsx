import React, { useState } from "react"
import { Box, TextField, Button, Stack, Typography } from "@mui/material"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

function Signup() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState("")

    const validate = () => {
        const newErrors = {}
        if (!email) newErrors.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email"
        if (!username) newErrors.username = "Username is required"
        if (!password) newErrors.password = "Password is required"
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"
        return newErrors
    }

    const handleSignup = async () => {
        setServerError("")
        const validationErrors = validate()
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length > 0) return

        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                username: username,
                email: email,
                password: password
            })
            setUsername("")
            setEmail("")
            setPassword("")
            setErrors({})
            console.log("Success! Response:", response.data)
        } catch (error) {
            setServerError(error.response?.data?.message || "Signup failed")
        }
    }

    return (
        <Box>
            <Stack>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    required
                    value={email}
                    error={!!errors.email}
                    helperText={errors.email}
                    onChange={e => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    required
                    value={username}
                    error={!!errors.username}
                    helperText={errors.username}
                    onChange={e => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    value={password}
                    error={!!errors.password}
                    helperText={errors.password}
                    onChange={e => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                {serverError && (
                    <Typography color="error" sx={{ mb: 2 }}>{serverError}</Typography>
                )}
                <Button variant="outlined" onClick={handleSignup}>Signup</Button>
            </Stack>
        </Box>
    )


}


export default Signup