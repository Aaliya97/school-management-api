const Classroom = require('../models/Classroom');
const School = require('../models/School');

exports.createClassroom = async (req, res) => {
  try {
    const { name, capacity, school } = req.body;
    const schoolExists = await School.findById(school);

    if (!schoolExists) return res.status(404).json({ msg: 'School not found' });

    const newClassroom = new Classroom({ 
      name, 
      capacity, 
      school, 
      schoolAdmin: req.user.id 
    });
    await newClassroom.save();
    res.status(201).json(newClassroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('school', 'name');
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id).populate('school', 'name');
    if (!classroom) return res.status(404).json({ msg: 'Classroom not found' });
    res.json(classroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classroom) return res.status(404).json({ msg: 'Classroom not found' });
    res.json(classroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!classroom) return res.status(404).json({ msg: 'Classroom not found' });
    res.json({ msg: 'Classroom deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
