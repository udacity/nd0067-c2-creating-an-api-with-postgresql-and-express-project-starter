"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../models/orderModel");
const ordersProductsModel_1 = require("../models/ordersProductsModel");
const authorization_1 = require("../utilities/authorization");
//needs return type
const createOrderHandler = async (req, res) => {
    try {
        console.log("hit Orders/signup");
        // const { userId }: Order = req.body;
        //we should get the userId from the token not the body (for more security)
        const Order = new orderModel_1.OrderModel();
        const order = await Order.create({
            userId: res.locals.userIdInToken,
        });
        //give a token
        return res.send({ ...order });
    }
    catch (err) {
        return res.send(`err in creating order , ${err} `);
    }
};
const getAllOrdersByUserIdHandler = async (req, res) => {
    try {
        console.log("hit Orders/index");
        const Order = new orderModel_1.OrderModel();
        const orders = await Order.getOrdersByUserId(res.locals.userIdInToken);
        return res.send(orders);
    }
    catch (err) {
        return res.send(`err in getting all Orders with userId ${res.locals.userIdInToken}, err: ${err} `);
    }
};
const getCompletedOrdersByUserIdHandler = async (req, res) => {
    try {
        console.log("hit Orders/index");
        const Order = new orderModel_1.OrderModel();
        const orders = await Order.getCompletedOrdersByUserId(res.locals.userIdInToken);
        return res.send(orders);
    }
    catch (err) {
        return res.send(`err in get completed orders by userId ${res.locals.userIdInToken}, err: ${err} `);
    }
};
const addProductToOrder = async (req, res) => {
    try {
        //check if the user own this order and order exist
        const orderInstance = new orderModel_1.OrderModel();
        const order = await orderInstance.checkIfUserOwnThisOrder(res.locals.userIdInToken, req.body.orderId);
        //add product to order
        if (!order) {
            return res.send(`this order doesn't exist or user with id ${res.locals.userIdInToken} doesn't own this order`);
        }
        //the order should be active to add more products to it (this how I think about it)
        else if (order.status === "complete") {
            return res.send("order is already completed");
        }
        //logic for adding product to order
        const { productId, orderId, quantity } = req.body;
        const relationInstance = new ordersProductsModel_1.OrdersProductsModel();
        const result = await relationInstance.create({
            productId,
            orderId,
            quantity,
        });
        return res.send(result);
    }
    catch (err) {
        return res.send(`err in adding product to order, err: ${err} `);
    }
};
const setOrderStatusByUserIdHandler = async (req, res) => {
    try {
        const orderInstance = new orderModel_1.OrderModel();
        //check if user own this order in the first place
        const orderCheck = await orderInstance.checkIfUserOwnThisOrder(res.locals.userIdInToken, req.body.orderId);
        if (!orderCheck) {
            return res.send(`this order doesn't exist or user with id ${res.locals.userIdInToken} doesn't own this order`);
        }
        //get userId from the token
        const { status, orderId } = req.body;
        const order = await orderInstance.setOrderStatus(orderId, res.locals.userIdInToken, status);
        return res.send('done');
    }
    catch (err) {
        return res.send(`err in setting the status of the order with userId ${res.locals.userIdInToken}, err: ${err} `);
    }
};
// const deleteOrderHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit Orders/delete/:OrderId");
//     if (res.locals.OrderIdInToken != req.params.OrderId) {
//       return res.send(
//         `you don\'t have the authority to delete the Order with id ${req.params.OrderId}`
//       );
//     }
//     const Order = new OrderModel();
//     await Order.delete(req.params.OrderId);
//     //even if Order doesn't exist this will return the deletion statement of the Order like with id=1000
//     return res.send("Order is deleted");
//   } catch (err: unknown) {
//     return res.send(
//       `err in deleting Order with id ${req.params.OrderId}, err: ${err} `
//     );
//   }
// };
const OrderRouter = (app) => {
    app.post("/orders/create", authorization_1.authorizationMiddleWare, createOrderHandler);
    //index for one user
    app.get("/orders/get-orders-for-user", authorization_1.authorizationMiddleWare, getAllOrdersByUserIdHandler);
    app.post("/orders/set-status", authorization_1.authorizationMiddleWare, setOrderStatusByUserIdHandler);
    app.get("/orders/complete", authorization_1.authorizationMiddleWare, getCompletedOrdersByUserIdHandler);
    app.post("/orders/addproduct", authorization_1.authorizationMiddleWare, addProductToOrder);
    // app.post("/Orders/delete/:OrderId", authorizationMiddleWare, deleteOrderHandler);
    //   app.get("/Orders/show/:OrderId", getOneOrderByIdHandler);
    //   //[Optional]
    //   app.get("/Orders/categories/:category", getOneOrderByCategoryHandler);
};
exports.default = OrderRouter;
