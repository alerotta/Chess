const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



router.post("/login", async (req, res) => {
    const allUsers = await prisma.user.findMany()
    res.send(allUsers)

})

router.post("/signup", async (req, res) => {

    await prisma.user.create({
        data: {
            username: 'req.body.username',
            email: 'req.body.email',
            password: 'req.body.password'
        }
    })

})



module.exports = router