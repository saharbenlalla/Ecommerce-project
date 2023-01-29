const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

//* Import Routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

//* Config app
const app = express();
require('dotenv').config();

//? DB mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABase, {
    useNewUrlParser: true
})
        .then(()=> console.log('db is connected ...'))
        .catch(()=> console.log('bd cannot connect !!'))
//? Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(expressValidator());

//! Routes Middlewares
app.use('/api', authRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);


const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Your app is running on port ${port}`)
})

