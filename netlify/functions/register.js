const mongoose = require('mongoose');
const User = require('../../backend/models/User');
const bcrypt = require('bcryptjs');

exports.handler = async function(event, context) {
  const { username, password } = JSON.parse(event.body);

  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    return {
      statusCode: 200,
      body: JSON.stringify({ user: savedUser._id })
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    };
  }
};
