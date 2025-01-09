const request = require('supertest');
const app = require('../app');
const Classroom = require('../models/Classroom');
const { closeDatabase } = require('./setup');

describe('Classroom API', () => {
  let token;
  let schoolId;
  let classroomId;

  beforeAll(async () => {
    // Register a user and login to get token
    await request(app).post('/api/auth/register').send({
      name: 'School Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'school-admin',
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'password123',
    });

    token = loginRes.body.token;

    // Create a School
    const schoolRes = await request(app)
      .post('/api/schools')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test School', address: '123 Street' });

    schoolId = schoolRes.body._id;
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test('Should create a classroom', async () => {
    const res = await request(app)
      .post('/api/classrooms')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Math Class', capacity: 30, school: schoolId });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Math Class');
    classroomId = res.body._id;
  });

  test('Should retrieve all classrooms', async () => {
    const res = await request(app)
      .get('/api/classrooms')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Should update a classroom', async () => {
    const res = await request(app)
      .put(`/api/classrooms/${classroomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Science Class' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Science Class');
  });

  test('Should delete a classroom', async () => {
    const res = await request(app)
      .delete(`/api/classrooms/${classroomId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('msg', 'Classroom deleted successfully');
  });
});
