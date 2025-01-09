const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management System API',
      version: '1.0.0',
      description: 'API documentation for managing schools, classrooms, and students',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Change this to production URL when deployed
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to API route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
