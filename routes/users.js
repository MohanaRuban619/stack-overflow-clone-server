import express from 'express'
import { signup,login } from '../controllers/auth.js'
import {getAllUsers , updatedProfile} from '../controllers/Users.js'
import auth from '../middleware/Auth.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id',auth,updatedProfile)

export default router