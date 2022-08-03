import {Router, Request, Response} from 'express'

// Needs token auth as middleware
const createOrderRouter = (app: Router) => {
    const orderRoute: Router = Router()
    app.use('/orders', orderRoute)
// - Current Order by user (args: user id)[token required] /orders/:user_id
    orderRoute.get('/:id', function (req: Request, res: Response) {
    res.send('Here are your orders')
})
// - [OPTIONAL] Completed Orders by user (args: user id)[token required]
}

export default createOrderRouter
