/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing students
 */
const express = require('express');
const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = express.Router();

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Enroll a new student
 *     tags: [Students]
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
 *               - age
 *               - school
 *               - classroom
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               school:
 *                 type: string
 *                 format: uuid
 *               classroom:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Student enrolled successfully
 *       500:
 *         description: Server error
 */
router.post('/', auth, role(['school-admin']), createStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   age:
 *                     type: number
 *                   school:
 *                     type: string
 *                   classroom:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', auth, role(['superadmin', 'school-admin']), getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Successfully retrieved student details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 age:
 *                   type: number
 *                 school:
 *                   type: string
 *                 classroom:
 *                   type: string
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, role(['superadmin', 'school-admin']), getStudentById);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update student details
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               school:
 *                 type: string
 *               classroom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, role(['school-admin']), updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, role(['school-admin']), deleteStudent);

module.exports = router;
