/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: API for managing schools
 */

const express = require('express');
const { createSchool } = require('../controllers/schoolController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = express.Router();
/**
 * @swagger
 * /api/schools:
 *   post:
 *     summary: Create a new school
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: School created successfully
 *       401:
 *         description: Unauthorized (Superadmin only)
 *       500:
 *         description: Server error
 */

router.post('/', auth, role(['superadmin']), createSchool);
/**
 * @swagger
 * /api/schools:
 *   get:
 *     summary: Get all schools
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: Successfully retrieved all schools
 *       500:
 *         description: Server error
 */

router.get('/', getAllSchools);
module.exports = router;
