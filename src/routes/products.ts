import { Router, Request, Response} from 'express'
import { ProductStore, Product } from '../models/productsModel'
import verifyToken from '../lib/auth'

const productInstance = new ProductStore

const createProductRouter = (app: Router) =>{
    const productRoute: Router = Router()
    app.use('/products', productRoute)

    productRoute.get('/', async (_req: Request, res: Response) => {
        const catalog: Product[] = await productInstance.showCatalog()
        res.json(catalog)
    }) 

    productRoute.get('/:id', async (req: Request, res: Response) => {
        const productID: number = parseInt(req.params.id)
        const product: Product[] = await productInstance.showProduct(productID)
        res.json(product)
    })

    productRoute.post('/', verifyToken, async (req: Request, res: Response) => {
        const newProduct: Product[] = await productInstance.createProduct(req.body)
        res.json(newProduct)
    })

    productRoute.delete('/trunk', verifyToken, async (req: Request, res: Response) => {
        const deletedTable = await productInstance.truncateProduct()
        res.json(deletedTable)
    })

    productRoute.delete('/:id', async (req: Request, res: Response) => {
        const productID = parseInt(req.params.id)
        const deletedRow = await productInstance.deleteProduct(productID)
        res.json(deletedRow)
    })
}


export default createProductRouter