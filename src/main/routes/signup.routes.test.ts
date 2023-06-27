import request from 'supertest'
import app from '../config/app'

describe('Signup routes', () => {
  test('should return an account on success', async () => {
    app.post('/api/signup', (req, res, next) => {
      res.send()
    })

    await request(app)
      .post('/api/signup')
      .send({
        name: 'Wellington',
        email: 'wellington.pereira@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
