const request = require('supertest');
const app = require('../app');
const { closeDatabase } = require('./setup');

describe('Student API', () => {
  let token;
  let schoolId;
  let classroomId;
  let studentId;

  beforeAll(async () => {
    // Register and login
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

    // Create a Classroom
    const classroomRes = await request(app)
      .post('/api/classrooms')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Math Class', capacity: 30, school: schoolId });

    classroomId = classroomRes.body._id;
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test('Should enroll a student', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'John Doe', age: 15, school: schoolId, classroom: classroomId });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'John Doe');
    studentId = res.body._id;
  });

  test('Should retrieve all students', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Should delete a student', async () => {
    const res = await request(app)
      .delete(`/api/students/${studentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('msg', 'Student deleted successfully');
  });
});
