import faker from 'faker'
import { Response, Request } from 'express'

const userList: any[] = [
  {
    id: 0,
    username: 'admin',
    password: 'any',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin'],
  },
]
const userCount = 100

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.random.alphaNumeric(9),
    password: faker.random.alphaNumeric(20),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    roles: ['visitor'],
  })
}

export const login = (req: Request, res: Response) => {
  const { username } = req.body
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        payload: {
          token: 'admin-token',
        },
        success: true,
      })
    }
  }
  return res.json({
    error: {
      code: 200036,
      message: '用户名或密码错误',
    },
    success: false,
  })
}

export const logout = (req: Request, res: Response) => {
  return res.json({
    success: true,
    payload: [],
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  if (req.header('X-Access-Token')) {
    return res.json({
      success: true,
      payload: userList[0],
    })
  }
  return res.json({
    success: false,
    error: {
      code: 20005,
      message: '登录失效',
    },
  })
}

export const getUsers = (req: Request, res: Response) => {
  return res.json({
    success: true,
    payload: userList,
  })
}
