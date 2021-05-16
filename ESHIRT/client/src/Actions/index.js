import {
    getUsers,
    getUsersByName,
    getUserById,
    postUser,
    putUser,
    deleteUser   
} from './user.js'

import {
    getShirts,
    getShirtsByName,
    getShirtById,
    postShirt,
    putShirt,
    deleteShirt
} from './shirt.js';

import {
    getCategories,
    getCategoriesByName,
    postCategory,
    putCategory,
    deleteCategory,
    filterByCategory
} from './category.js';

import {
    addOne,
    outOne,
    pushItem,
    deleteItem,
    changeSize,
    clear,
    postOrder,
    putOrder,
    modifyOrderStatus,
    resetPutOrderOk,
    getOrders,
    getOrderById,
    getOrdersByUserId
} from './cart.js'

const resetErrors = () => {
    return {type: 'RESET_ERRORS'}
}

export {
    resetErrors,

    getUsers,
    getUsersByName,
    getUserById,
    postUser,
    putUser,
    deleteUser,

    getShirts,
    getShirtsByName,
    getShirtById,
    postShirt,
    putShirt,
    deleteShirt,

    getCategories,
    getCategoriesByName,
    postCategory,
    putCategory,
    deleteCategory,
    filterByCategory,  
    
    addOne,
    outOne,
    pushItem,
    deleteItem,
    changeSize,
    clear,
    postOrder,
    putOrder,
    modifyOrderStatus,
    resetPutOrderOk,
    getOrders,
    getOrderById,
    getOrdersByUserId
}
