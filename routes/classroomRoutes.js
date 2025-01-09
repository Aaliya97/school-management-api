/**
 * @swagger
 * tags:
 *   name: Classrooms
 *   description: API for managing classrooms
 */

const express = require('express');
const { createClassroom, getAllClassrooms, getClassroomById, updateClassroom, deleteClassroom } = require('../controllers/classroomController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = express.Router();

/**
 * @swagger
 * /api/classrooms:
 *   post:
 *     summary: Create a new classroom
 *     tags: [Classrooms]
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
 *               - capacity
 *               - school
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: number
 *               school:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Classroom created successfully
 *       500:
 *         description: Server error
 */
router.post('/', auth, role(['school-admin']), createClassroom);

/**
 * @swagger
 * /api/classrooms:
 *   get:
 *     summary: Get all classrooms
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all classrooms
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
 *                   capacity:
 *                     type: number
 *                   school:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', auth, role(['superadmin', 'school-admin']), getAllClassrooms);

/**
 * @swagger
 * /api/classrooms/{id}:
 *   get:
 *     summary: Get a classroom by ID
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom ID
 *     responses:
 *       200:
 *         description: Successfully retrieved classroom details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: number
 *                 school:
 *                   type: string
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, role(['superadmin', 'school-admin']), getClassroomById);

/**
 * @swagger
 * /api/classrooms/{id}:
 *   put:
 *     summary: Update classroom details
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: number
 *               school:
 *                 type: string
 *     responses:
 *       200:
 *         description: Classroom updated successfully
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, role(['school-admin']), updateClassroom);

/**
 * @swagger
 * /api/classrooms/{id}:
 *   delete:
 *     summary: Delete a classroom by ID
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom ID
 *     responses:
 *       200:
 *         description: Classroom deleted successfully
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, role(['school-admin']), deleteClassroom);

module.exports = router;
