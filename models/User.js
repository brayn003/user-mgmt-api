const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: 'string',
  email: {type: 'string', unique: true},
  gender: {type: 'string', enum: ['male', 'female', 'others']},
  password: 'string'
});

const model = mongoose.model('User', UserSchema);
module.exports = model;