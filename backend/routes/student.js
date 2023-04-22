const express = require('express')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Student = require('../models/Student')
const { generateToken } = require('../utils/generalUtils')
const { protectStudent, protectAdmin, protectFaculty } = require('../middleware/authMiddleware')

const router = express.Router()

// Register
router.post(
    '/register',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const { username, password, facialId, registrationNumber, universityEmail, department, programme, year, fullName, personalEmail, phone, address, other } = req.body

        if (!username || !password || !facialId || !registrationNumber || !universityEmail || !department || !programme || !year || !fullName || !personalEmail || !phone || !address) {
            res.status(400)
            throw new Error('Incomplete information')
        }

        const studentExists = await Student.findOne({ username })

        if (studentExists) {
            res.status(400)
            throw new Error('Student already exists')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const student = await Student.create({
            username,
            password: hashedPassword,
            facialId,

            registrationNumber,
            universityEmail,
            department,
            programme,
            year,

            fullName,
            personalEmail,
            phone,
            address,
            other: typeof(other) === 'object' ? other : {}
        })

        if (student) {
            res.status(201).json({
                token: generateToken({
                    id: student.id,
                    username: student.username
                })
            })
        } else {
            res.status(400)
            throw new Error('Invalid student data')
        }
    })
)

// Login
router.post(
    '/login',

    asyncHandler(async (req, res) => {

        const { username, password } = req.body
        const student = await Student.findOne({ username })

        if (!student) {
            req.status(400)
            throw new Error('Student does not exist')
        }

        const id = student.id

        const passwordValidated = await bcrypt.compare(password, admin.password)
        if (!passwordValidated) {
            res.status(401)
            throw new Error('Incorrect password')
        }

        res.status(200).json({
            token: generateToken({
                id,
                username
            })
        })
        
    })
)

// Delete Student
router.post(
    '/delete',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(400)
            throw new Error('No user ID provided to delete')
        }

        await Student.findByIdAndDelete(id)
        
    })
)

// Mark Attendance
router.put(
    '/attendance',

    protectFaculty,

    asyncHandler(async (req, res) => {

        const { attendanceInfo } = req.body

        if (!attendanceInfo) {
            res.status(400)
            throw new Error('No attendance information')
        }

        attendanceInfo.forEach(async id => {
            await Student.findByIdAndUpdate(
                id,
                { $inc: { classesConducted: 1, classesAttended: attendanceInfo[id] ? 1 : 0 } }
            )
        })
        
    })
)

// Get Info
router.get(
    '/me',

    protectStudent,

    asyncHandler(async (req, res) => {
        
        res.status(200).json(req.user)

    })
)

// Get complete Info
router.get(
    '/info',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const student = await Student.findById(req.user.id)

        if (!student) {
            res.status(400)
            throw new Error('User with ID does not exist')
        }

        res.status(200).json(student)

    })
)

// Get all
router.get(
    '/all',

    protectAdmin,

    asyncHandler(async (req, res) => {

        const students = await Student.find({})

        res.status(200).json(students)
        
    })
)


module.exports = router