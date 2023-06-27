import request from 'supertest'
import app from '../config/app'

describe('Content-Type Midd', () => {
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res, next) => {
      res.send()
    })

    await request(app).get('/test_content_type').expect('content-type', /json/)
  })

  test('Should return default content type as xml', async () => {
    app.get('/test_content_type_xml', (req, res, next) => {
      res.type('xml')
      res.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
