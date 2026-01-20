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

  it('should not be possible to create a user with an existing email', async () => {
    const response = await request(app).post('/users').send({
      name: 'Jane Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Email already registered')
  })

  it('should be able to validation error if emais is invalid', async () => {
    const response = await request(app).post('/users').send({
      name: 'Invalid Email User',
      email: 'invalid-email',
      password: 'password123',
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Validation failed')
  })

  it('should be able to authenticate and get a token', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('token')
    expect(response.body.token).toEqual(expect.any(String))
  })
})
