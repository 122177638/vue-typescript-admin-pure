/*
 * @Author: Anles💯
 * @Date: 2020-09-22 10:33:58
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-22 17:21:12
 * @Description: 👉
 */
import faker from 'faker'
import { Response, Request } from 'express'

const transactionList: any[] = []
const transactionCount = 20

for (let i = 0; i < transactionCount; i++) {
  transactionList.push({
    orderId: faker.random.uuid(),
    status: faker.random.arrayElement(['success', 'pending']),
    timestamp: faker.date.past().getTime(),
    username: faker.name.findName(),
    price: parseFloat(faker.finance.amount(1000, 15000, 2))
  })
}

export const getTransactions = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      total: transactionList.length,
      items: transactionList
    }
  })
}
