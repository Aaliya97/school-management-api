const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  schoolAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Classroom', ClassroomSchema);
