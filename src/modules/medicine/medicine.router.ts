import express from 'express'
import { medicineController } from './medicine.controller'
import auth, { UserRole } from '../../middileware/auth'

const router = express.Router()



router.post('/',auth(UserRole.ADMIN,UserRole.SELLER),medicineController.createMedicine)
router.get('/',medicineController.getAllMedicine)











export const medicineRouter = router