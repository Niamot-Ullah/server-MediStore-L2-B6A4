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
    isFeatured: boolean | undefined,
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;

}) => {
    const { search, isFeatured, page, limit, skip, sortBy, sortOrder } = payload

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
    console.log(page,limit,skip);


    const result = await prisma.medicine.findMany({
        take: limit,
        skip,
        where: {
            AND: andConditions
        },
        orderBy: {
            [sortBy]: sortOrder,
        },

    })
    const total = await prisma.medicine.count({
        where: {
            AND: andConditions,
        },
    });
    return {
        data: result,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }
    };












    export const medicineService = {
        createMedicine,
        getAllMedicine,

    }