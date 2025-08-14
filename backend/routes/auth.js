const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

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

        res.status(200).json({ message: "Login successful" })
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
        res.status(500).json({ error: "Error creating user" })
    }

})



module.exports = router