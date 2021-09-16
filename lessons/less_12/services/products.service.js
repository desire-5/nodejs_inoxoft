const Product = require('../dataBase/Product');
const {PRODUCT_PER_PAGE} = require('../configs/constants');

module.exports = {
    findAll: async (query = {}) => {
        const {
            perPage = PRODUCT_PER_PAGE,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? 1 : -1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};
        const priceFilter = {};

        Object.keys(filters).forEach((key) => {
            switch (key) {
                case 'name':
                    filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                    break;
                case 'category':
                    filterObject.category = filters.category;
                    break;
                case 'brand':
                    filterObject.brand = filters.brand;
                    break;
                case 'price.gte':
                    Object.assign(priceFilter, { $gte: +filters['price.gte'] });
                    break;
                case 'price.lte':
                    Object.assign(priceFilter, { $lte: +filters['price.lte'] });
                    break;
            }
        });

        if (Object.keys(priceFilter).length) {
            filterObject.price = priceFilter;
        }

        const products = await Product
            .find(filterObject)
            .limit(+perPage)
            .skip(skip)
            .sort(sort);

        const count = await Product.countDocuments(filterObject);

        return {
            data: products,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        };
    }
};
