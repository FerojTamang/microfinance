const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const corsMiddleware = require('./middleware/corsMiddleware');

app.use(corsMiddleware); // Apply CORS middleware first
app.use(express.json());
app.use('/api/auth', authRoutes); // localhost:3000/api/auth/register

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
}); 