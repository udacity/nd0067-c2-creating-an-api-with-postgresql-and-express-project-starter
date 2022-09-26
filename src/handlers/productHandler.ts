import { Application, Request, Response } from "express";
import { Product, ProductModel } from "../models/productModel";
import {
  compareHash,
  createHash,
  createToken,
} from "../utilities/authentication";
import { authorizationMiddleWare } from "../utilities/authorization";

//needs return type
const createProductHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit products/signup");
    const { name, price, category }: Product = req.body;
    const Product = new ProductModel();
    const product = await Product.create({
        name, 
        price,
        category
    });
    //give a token
    return res.send({ ...product});
  } catch (err: unknown) {
    return res.send(`err in creating product, ${err} `);
  }
};


// const deleteproductHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit products/delete/:productId");
//     if (res.locals.productIdInToken != req.params.productId) {
//       return res.send(
//         `you don\'t have the authority to delete the product with id ${req.params.productId}`
//       );
//     }
//     const product = new productModel();
//     await product.delete(req.params.productId);
//     //even if product doesn't exist this will return the deletion statement of the product like with id=1000
//     return res.send("product is deleted");
//   } catch (err: unknown) {
//     return res.send(
//       `err in deleting product with id ${req.params.productId}, err: ${err} `
//     );
//   }
// };

// const getAllproductsHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit products/index");
//     const product = new productModel();
//     const products = await product.index();
//     return res.send(products);
//   } catch (err: unknown) {
//     return res.send(`err in getting all products, err: ${err} `);
//   }
// };

// const getOneproductByIdHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit products/show/:productId");
//     if (res.locals.productIdInToken != req.params.productId) {
//       return res.send(
//         `you don\'t have the authority to view the product with id ${req.params.productId}`
//       );
//     }
//     const product = new productModel();
//     const product = await product.show(req.params.productId);
//     if (!product) {
//       return res.send("no product found with this productId");
//     }
//     const { id, firstname, lastname } = product;
//     return res.send({ id, firstname, lastname});
//   } catch (err: unknown) {
//     return res.send(
//       `err in getting product with Id ${req.params.productId}, err: ${err} `
//     );
//   }
// };

const productRouter = (app: Application): void => {
  app.post("/products/create",authorizationMiddleWare, createProductHandler);
//   app.post("/products/delete/:productId", authorizationMiddleWare, deleteproductHandler);
//   app.get("/products/index", authorizationMiddleWare, getAllproductsHandler);
//   app.get(
//     "/products/show/:productId",
//     authorizationMiddleWare,
//     getOneproductByIdHandler
//   );
};

export default productRouter;
