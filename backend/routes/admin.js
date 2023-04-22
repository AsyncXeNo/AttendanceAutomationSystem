const express = require('express')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Admin = require('../models/Admin')
const { generateToken } = require('../utils/generalUtils')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

// Login
router.post(
    '/login',

    asyncHandler(async (req, res) => {

        const { username, password } = req.body
        const admin = await Admin.findOne({ username })

        if (!admin) {
            res.status(400)
            throw new Error('Incorrect Credentials')
        }

        const id = admin.id
 
        const passwordValidated = await bcrypt.compare(password, admin.password)
        if (!passwordValidated) {
            res.status(401)
            throw new Error('Incorrect Credentials')
        }

        res.status(200).json({
            token: generateToken({
                id,
                username
            })
        })
        
    })
)


module.exports = router