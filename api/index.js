const express = require('express');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const cors = require('cors');

app.use(cors());
app.use(express.json());

db();

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
