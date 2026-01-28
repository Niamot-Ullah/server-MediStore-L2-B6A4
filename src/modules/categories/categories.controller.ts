import { Request, Response } from "express";
import { categoriesService } from "./categories.service";


const createCategories = async (req: Request, res: Response) => {
    // console.log(req.body);
    try {
        const result = await categoriesService.createCategories(req.body)
        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
}




export const categoriesController = {
    createCategories,

}