const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
//const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 80;
const cors = require('cors')

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/animes', require('./routes/animesRoutes'))
app.use('/api/perguntas', require('./routes/perguntasRoutes'))
app.use('/api/salas', require('./routes/salasRoutes'))


//app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));