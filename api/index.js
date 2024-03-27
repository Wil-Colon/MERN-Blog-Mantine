const express = require('express');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/user.route');

db();

app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
