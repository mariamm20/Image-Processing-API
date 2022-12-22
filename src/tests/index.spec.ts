import supertest from 'supertest'
import app from '../index'
import fs from 'fs'
import path from 'path'
import { getImageDir } from '../utilities'
// create a request object
const request = supertest(app)
const imageDir = getImageDir()

describe('Test endpoint response', () => {
  it('test main route endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
  it('test when resized file exists ', () => {
    const resizedFile = path.join(imageDir, 'resized')
    if (fs.existsSync(resizedFile)) {
      fs.mkdirSync(resizedFile, { recursive: true })
    }
  })
  it('test Image with vaild filename ', async () => {
    const response = await request.get('/image').query({ filename: 'fjord' })
    expect(response.status).toBe(200)
  })
  it('test Image with invaild filename ', async () => {
    const response = await request.get('/image').query({ filename: 'london' })
    expect(response.status).toBe(404)
  })
  it('test Image with vaild filename and invalid width ', async () => {
    const response = await request.get('/image').query({ filename: 'fjord', width: 'abc' })
    expect(response.status).toBe(400)
  })
  it('test Image with vaild filename and valid width ', async () => {
    const response = await request.get('/image').query({ filename: 'fjord', width: '200' })
    expect(response.status).toBe(200)
  })
  it('test Image with vaild filename and invalid height ', async () => {
    const response = await request.get('/image').query({ filename: 'fjord', height: 'abc10' })
    expect(response.status).toBe(400)
  })
  it('test Image with vaild filename and valid height ', async () => {
    const response = await request.get('/image').query({ filename: 'fjord', height: '300' })
    expect(response.status).toBe(200)
  })
  it('test Image with vaild filename, invalid width and valid height ', async () => {
    const response = await request
      .get('/image')
      .query({ filename: 'fjord', width: 'abc', height: '100' })
    expect(response.status).toBe(400)
  })
  it('test Image with vaild filename, valid width and invalid height ', async () => {
    const response = await request
      .get('/image')
      .query({ filename: 'fjord', width: '100', height: 'abc' })
    expect(response.status).toBe(400)
  })
  it('test Image with vaild filename, valid width and valid height ', async () => {
    const response = await request
      .get('/image')
      .query({ filename: 'fjord', width: '100', height: '150' })
    expect(response.status).toBe(200)
  })
})
