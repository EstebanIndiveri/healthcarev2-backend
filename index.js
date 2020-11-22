const express = require('express');
require('dotenv').config();
const cors=require('cors');
const { dbConnection } = require('./db/config');


const app=express();

//DB:
dbConnection();

//crs:

app.use(cors());

//public
app.use(express.static('public'));

//read parse body
app.use( express.json() );

//rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );



//auth, log, newtoken
//crud: turno



const port =process.env.PORT

app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
})