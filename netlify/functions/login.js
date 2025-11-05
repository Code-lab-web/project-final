const mongoose = require('mongoose');
const User = require('../../backend/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async function(event, context) {
  const { username, password } = JSON.parse(event.body);

  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const user = await User.findOne({ username });
  if (!user) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Username not found' })
    };
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid password' })
    };
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return {
    statusCode: 200,
    headers: { 'auth-token': token },
    body: JSON.stringify({ token })
  };
};
