import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const result = await medicineService.createMedicine(req.body)
        res.status(201).json({
            success: true,
            message: "Medicine Created Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}




export const medicineController = {
    createMedicine,

}