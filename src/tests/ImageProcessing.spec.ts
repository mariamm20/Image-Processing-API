import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';
import { getImageDir, resizing } from '../utilities';
// create a request object
const request = supertest(app);
const imageDir = getImageDir();
const resizedFile = path.join(imageDir, 'resized');

describe('Test resizing function', () => {
  it('Test resized file existance delete it and regenerate by calling resizing function ', () => {
    if (fs.existsSync(resizedFile)) {
      fs.rmSync(resizedFile, { recursive: true, force: true });
    }
    resizing('fjord', 500, 300);
    expect(fs.existsSync(resizedFile)).toBeTrue();
  });
});

describe('Test / and  /image endpoint response', () => {
  it('test main route endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('test image endpoint with vaild filename ', async () => {
    const response = await request.get('/image').query({ filename: 'fjord' });
    expect(response.status).toBe(200);
  });
  it('test image endpoint with invaild filename ', async () => {
    const response = await request.get('/image').query({ filename: 'london' });
    expect(response.status).toBe(404);
  });
});
