import express from 'express'
import { medicineController } from './medicine.controller'

const router = express.Router()


router.post('/',medicineController.createMedicine)










export const medicineRouter = router