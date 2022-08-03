import { Router, Request, Response} from 'express'
import { ProductStore, Product } from '../models/productsModel'

const productInstance = new ProductStore

const createProductRouter = (app: Router) =>{
    const productRoute: Router = Router()
    app.use('/products', productRoute)

    productRoute.get('/', async (_req: Request, res: Response) => {
        const catalog: Product[] = await productInstance.showCatalog()
        res.json(catalog)
    }) 

    productRoute.get('/:id', async (req: Request, res: Response) => {
        const productID: Number = parseInt(req.params.id)
        const product: Product[] = await productInstance.showProduct(productID)
        res.json(product)
    })
    // Needs token auth as middleware
    productRoute.post('/', async (req: Request, res: Response) => {
        const newProduct: Product[] = await productInstance.createProduct(req.body)
        res.json(newProduct)
    })

    productRoute.delete('/:id', async (req: Request, res: Response) => {
        const productID: Number = parseInt(req.params.id)
        const result = await productInstance.deleteProduct(productID)
        res.json(result)
    })
    // - [OPTIONAL] Top 5 most popular products 
    // - [OPTIONAL] Products by category (args: product category)
}


export default createProductRouter