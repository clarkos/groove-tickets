const { Op } = require('sequelize');
const { Order, OrderItem } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getOrders = async (page, size, sort, filter) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    // Filters
    if (filter && Object.keys(JSON.parse(filter)).length > 0) {
        const filterObj = JSON.parse(filter);

        const idsCondition = filterObj.id ?
            { [Op.in]: filterObj.id }
            :
            { [Op.gt]: 0 };
        const customerIdCondition = filterObj.customerId ?
            { [Op.eq]: filterObj.customerId }
            :
            { [Op.gt]: 0 };
        const orderDateGteCondition = filterObj.date_gte ?
            { [Op.gte]: filterObj.date_gte }
            :
            { [Op.gte]: '0001-01-01' };
        const orderDateLteCondition = filterObj.date_lte ?
            { [Op.lte]: filterObj.date_lte }
            :
            { [Op.gte]: '0001-01-01' };
        const statusCondition = filterObj.status ?
            { [Op.eq]: filterObj.status }
            :
            { [Op.in]: ['Created', 'Processing', 'Canceled', 'Completed'] };

        options.where = {
            [Op.and]:
                [
                    { id: idsCondition },
                    { orderDate: orderDateGteCondition },
                    { orderDate: orderDateLteCondition },
                    { customerId: customerIdCondition },
                    { status: statusCondition }
                ]
        };
    }

    let orders = await Order.findAndCountAll(options);

    return orders;
}

module.exports = { getOrders };
