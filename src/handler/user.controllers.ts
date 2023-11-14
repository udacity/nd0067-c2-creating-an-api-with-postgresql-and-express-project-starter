import { User, UserStore, UserType } from '../models/user'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const userStore = new UserStore()
const { TOKEN_SECRET, TEST_USER_PASSWORD } = process.env

class UserControllers {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userStore.index()
      res.json(users)
    } catch (error) {
      res.status(500)
      res.send(error)
    }
  }

  async addDemoUser(req: Request, res: Response): Promise<void> {
    const user: Omit<User, 'id'> = {
      first_name: 'sang',
      last_name: 'pham',
      email: 'sang.pham@test.com',
      password: TEST_USER_PASSWORD
    }
    try {
      if (!TOKEN_SECRET) {
        throw new Error('Missing env variable: TOKEN_SECRET')
      }

      if (!TEST_USER_PASSWORD) {
        throw new Error('Missing env variable: TEST_USER_PASSWORD')
      }
      const newUser: User = await userStore.create(user)
      const token = jwt.sign(
        {
          user: {
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email
          }
        },
        TOKEN_SECRET
      )
      res.status(201).json(token)
    } catch (e) {
      res.status(500).send(e)
    }
  }

  getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: User = await userStore.show(parseInt(req.params['id'], 10))
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).send('User not found.')
      }
    } catch (e) {
      res.status(500)
      res.send(e)
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const user: UserType = req.body
    try {
      const newUser: User = await userStore.create(user)
      const token = jwt.sign(
        {
          user: {
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email
          }
        },
        TOKEN_SECRET as string
      )
      res.status(201).json(token)
    } catch (e) {
      res.status(500).send(e)
    }
  }

  authenticateUser = async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email
    const password: string = req.body.password

    try {
      if (!email || !password) {
        throw new Error('Could not parse credentials')
      }
      if (!TOKEN_SECRET) {
        throw new Error('Missing env variable: TOKEN_SECRET missing')
      }

      const authUser: User | null = await userStore.authenticate(email, password)
      if (!authUser) {
        throw new Error(`Could not authenticate user: ${email}. Wrong credentials`)
      }
      const token = jwt.sign(
        {
          user: {
            id: authUser.id,
            first_name: authUser.first_name,
            last_name: authUser.last_name,
            email: authUser.email
          }
        },
        TOKEN_SECRET
      )

      res.status(200).json(token)
    } catch (e) {
      res.status(500).send(e)
    }
  }
}

export default new UserControllers()
