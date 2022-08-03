import {Router, Request, Response} from 'express'


// Needs token auth added as middleware
const createUserRouter = (app: Router) => {
    const userRoute: Router = Router()
    app.use('/Users', userRoute)

    userRoute.get('/', function (req: Request, res: Response) {
    res.send('Hello User')
})

    userRoute.get('/:id', function (req: Request, res: Response) {
    res.send(req.params.id)
})

    userRoute.post('/', function (req: Request, res: Response) {
    res.send('User Created??')
})
}

export default createUserRouter
