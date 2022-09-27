import { Application, Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
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

const getAllOrdersHandlerByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit Orders/index");
    const Order = new OrderModel();
    const Orders = await Order.getOrderByUserId(res.locals.userIdInToken);
    return res.send(Orders);
  } catch (err: unknown) {
    return res.send(`err in getting all Orders, err: ${err} `);
  }
};

//[Optional]
// const getOneOrderByIdHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit Orders/show/:OrderId");
//     const Order = new OrderModel();
//     const Order = await Order.show(req.params.OrderId);
//     if (!Order) {
//       return res.send("no Order found with this OrderId");
//     }
//     return res.send(Order);
//   } catch (err: unknown) {
//     return res.send(
//       `err in getting Order with Id ${req.params.OrderId}, err: ${err} `
//     );
//   }
// };

// const getOneOrderByCategoryHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit Orders/categories/:category");
//     const Order = new OrderModel();
//     const Order = await Order.fetchByCategory(req.params.category);
//     if (!Order) {
//       return res.send("no Order found with this category");
//     }
//     return res.send(Order);
//   } catch (err: unknown) {
//     return res.send(
//       `err in getting Order with category ${req.params.OrderId}, err: ${err} `
//     );
//   }
// };

const OrderRouter = (app: Application): void => {
  app.post("/orders/create", authorizationMiddleWare, createOrderHandler);
  //   app.post("/Orders/delete/:OrderId", authorizationMiddleWare, deleteOrderHandler);
  //index for one user
  app.get(
    "/orders/indexforuser",
    authorizationMiddleWare,
    getAllOrdersHandlerByUserId
  );
  //   app.get("/Orders/show/:OrderId", getOneOrderByIdHandler);
  //   //[Optional]
  //   app.get("/Orders/categories/:category", getOneOrderByCategoryHandler);
};

export default OrderRouter;
