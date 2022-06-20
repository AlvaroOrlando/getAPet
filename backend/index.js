const express = require('express');
const app = express();
require('dotenv').config(); 
const PORT = process.env.PORT;

const cors = require('cors');
const conn = require('./db/conn');

//config json response
app.use(express.json());

//Solve CORS
app.use(cors({credentials:true, origin:'http://localhost:3000'}));

//Public Folder for images
app.use(express.static('public'));

//Routes
const userRoutes = require('./routes/UserRoutes');

app.use('/users', userRoutes);






app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})