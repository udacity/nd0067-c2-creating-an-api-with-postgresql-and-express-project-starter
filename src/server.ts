import express, { Request, Response , Application} from 'express'
import bodyParser from 'body-parser'
import client from './db/db'
const app: Application = express()
const address: string = "0.0.0.0:3000"
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
