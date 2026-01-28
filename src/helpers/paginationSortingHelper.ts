type IOption = {
    page?: number | string;
    limit?: number | string;
    sortOrder?: string;
    sortBy?: string;
};
type iOptionResult = {
    page?: number;
    limit?: number;
    skip?: number;
    sortBy: string;
    sortOrder: string;
};



const paginationSortingHelper = (options: IOption): iOptionResult => {
    const result: iOptionResult = {
        sortBy: options.sortBy || "createdAt",
        sortOrder: options.sortOrder || "desc",
    };

    if (options.page !== undefined && options.limit !== undefined) {
        const page = Number(options.page);
        const limit = Number(options.limit);

        result.page = page;
        result.limit = limit;
        result.skip = (page - 1) * limit;
    }

    return result;
};


export default paginationSortingHelper;