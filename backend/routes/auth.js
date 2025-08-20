const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const authToken = require('../middleware/authToken')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"


const prisma = new PrismaClient()


router.post("/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { username } })
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" })
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '12h' })

        res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        res.status(500).json({ error: "Error logging in" })
    }
})


router.post("/signup", async (req, res) => {

    const { username, email, password } = req.body


    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        })

        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        if (error.code === "P2002") {
            // Unique constraint failed
            const target = error.meta?.target?.join(", ") || "field"
            return res.status(409).json({ message: `A user with this ${target} already exists.` })
        }
        res.status(500).json({ error: "Error creating user" })
    }

})

router.get("/test-protected", authToken, async (req, res) => {
    res.send("this is the test")
})


module.exports = router