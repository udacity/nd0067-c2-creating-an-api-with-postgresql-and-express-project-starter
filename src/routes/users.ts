import {Router, Request, Response} from 'express'

const createUserRouter = (app: Router) => {
    const userRoute: Router = Router()
    app.use('/User', userRoute)

    userRoute.get('/', function (req, res) {
    res.send('Hello User')
})

    userRoute.get('/:id', function (req, res) {
    res.send(req.params.id)
})

    userRoute.post('/', function (req, res) {
    res.send('User Created??')
})
}

export default createUserRouter
