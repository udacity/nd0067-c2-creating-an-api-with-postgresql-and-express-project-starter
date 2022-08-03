import { Router, Request, Response} from 'express'

const createProductRouter = (app: Router) =>{
    const productRoute: Router = Router()
    app.use('/products', productRoute)

    productRoute.get('/', function (req, res) {
        res.send('Hello Products')
    }) 

    productRoute.get('/:id', function (req, res) {
        res.send(req.params.id)
    })
    // - Create [token required] 
    productRoute.post('/', function (_req, res) {
        res.send('Create new product')
    })
    // - [OPTIONAL] Top 5 most popular products 
    // - [OPTIONAL] Products by category (args: product category)
}


export default createProductRouter