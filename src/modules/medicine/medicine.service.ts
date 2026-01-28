import { Medicine, Prisma } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
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



const createMedicine = async (data: CreateMedicineInput, userId: string) => {
    const result = await prisma.medicine.create({
        data: {
            ...data,
            sellerId: userId
        }
    })
    return result
}

const getAllMedicine = async (payload: {
    search: string | undefined,
    isFeatured: boolean | undefined

}) => {
    const { search, isFeatured } = payload

    const andConditions: MedicineWhereInput[] = [];
    if (search) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
            ],
        });
    }
    if (typeof isFeatured === "boolean") {
        andConditions.push({
            isFeatured,
        });
    }


    const result = await prisma.medicine.findMany({
        where: {
            AND: andConditions
        },
    })
    return result
}












export const medicineService = {
    createMedicine,
    getAllMedicine,

}