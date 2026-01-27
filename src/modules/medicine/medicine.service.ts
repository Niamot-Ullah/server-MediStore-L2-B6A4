import { Medicine, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type CreateMedicineInput = {
    name: string;
    description?: string;
    categoryId: string;
    sellerId: string;
    price: Prisma.Decimal | number | string;
    stock: number;
    image?: string;
    isActive?: boolean;
};



//  | "sellerId"

const createMedicine = async(data: CreateMedicineInput)=>{
    const result = await prisma.medicine.create({
        data
    })
    return result
}











export const medicineService ={
    createMedicine,

}