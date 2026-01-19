import app from '@/app'
import request from 'supertest'
import { prisma } from '@/database/prisma'

describe('UsersController', () => {
  let user_id: string

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it('should be possible to create a user', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toBe('John Doe')

    user_id = response.body.id
  })
})
