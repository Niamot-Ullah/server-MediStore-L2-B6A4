import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.user);
    try {
        if (!req.user) {
            return res.status(400).json({
                success: false,
                error: "Unauthorized",
            });
        }

        console.log(req.user);
        const result = await medicineService.createMedicine(req.body, req.user.id)
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

const getAllMedicine = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const searchString = typeof search === "string" ? search : undefined;

        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === "true"
                ? true
                : req.query.isFeatured === "false"
                    ? false
                    : undefined
            : undefined;
            // console.log(isFeatured);

        const result = await medicineService.getAllMedicine({
            search: searchString,
            isFeatured,
        })
        res.status(200).json({
            success: true,
            message: "Data Retrieved Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}




export const medicineController = {
    createMedicine,
    getAllMedicine,

}