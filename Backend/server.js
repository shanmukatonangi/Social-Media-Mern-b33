const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI || 'mongodb+srv://b33:b33@cluster0.hjjh1zi.mongodb.net/');

app.use('/api/auth', require('./routes/Auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));
