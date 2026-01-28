import { prisma } from "../../lib/prisma";

type CreateCategoriesInput = {
    name: string;
    description?: string;
   
};



const createCategories = async(data: CreateCategoriesInput)=>{
    const result = await prisma.categories.create({
        data
    })
    return result
}




export const categoriesService ={
    createCategories,

}