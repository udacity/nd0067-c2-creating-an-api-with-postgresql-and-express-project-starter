import { Application, Request, Response } from "express";
import { Order, OrderModel } from "../models/orderModel";
import { OrdersProductsModel } from "../models/ordersProductsModel";
import { authorizationMiddleWare } from "../utilities/authorization";

//needs return type
const createOrderHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit Orders/signup");
    // const { userId }: Order = req.body;
    //we should get the userId from the token not the body (for more security)
    const Order = new OrderModel();
    const order = await Order.create({
      userId: res.locals.userIdInToken,
    });
    //give a token
    return res.send({ ...order, products: [] });
  } catch (err: unknown) {
    return res.send(`err in creating Order, ${err} `);
  }
};

const getAllOrdersHandlerByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit Orders/index");
    const Order = new OrderModel();
    const Orders = await Order.getOrdersByUserId(res.locals.userIdInToken);
    return res.send(Orders);
  } catch (err: unknown) {
    return res.send(`err in getting all Orders, err: ${err} `);
  }
};

const addProductToOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //check if the user own this order and order exist
    const orderInstance = new OrderModel()
    const order = await orderInstance.checkIfUserOwnThisOrder(res.locals.userIdInToken, req.body.orderId)

    //add product to order
    if(!order){
        return res.send('this order doesn\'t exist or user don\'t own this order')
    }
    else if((order as Order).status === 'complete'){
        return res.send('order is already completed')
    }

    //logic for adding product to order
    const { productId, orderId, quantity} = req.body
    const relationInstance = new OrdersProductsModel()
    const result = await relationInstance.create({productId, orderId, quantity}) 
    return res.send(result);
  } catch (err: unknown) {
    return res.send(`err in adding product to order, err: ${err} `);
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


const OrderRouter = (app: Application): void => {
  app.post("/orders/create", authorizationMiddleWare, createOrderHandler);
  //index for one user
  app.get(
    "/orders/indexforuser",
    authorizationMiddleWare,
    getAllOrdersHandlerByUserId
  );
  app.post('/orders/addproduct', authorizationMiddleWare, addProductToOrder)
    // app.post("/Orders/delete/:OrderId", authorizationMiddleWare, deleteOrderHandler);
  //   app.get("/Orders/show/:OrderId", getOneOrderByIdHandler);
  //   //[Optional]
  //   app.get("/Orders/categories/:category", getOneOrderByCategoryHandler);
};

export default OrderRouter;
