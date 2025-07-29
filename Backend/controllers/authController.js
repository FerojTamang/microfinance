const User = require('../models/User'); // Adjust path as needed
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received registration data:', { username, password });
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    console.log('User created:', user.toJSON());
    res.status(201).json({ message: 'User registered successfully', user: { username: user.username } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { username: user.username } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser };