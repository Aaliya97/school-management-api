const request = require('supertest');
const app = require('../app'); // Import the Express app
const { closeDatabase } = require('./setup');

describe('Authentication API', () => {
  afterAll(async () => {
    await closeDatabase();
  });

  test('Should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'school-admin',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('msg', 'User registered successfully');
  });

  test('Should log in a user and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
