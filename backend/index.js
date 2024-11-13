const express = require("express");
const cors = require('cors');
const connection = require('./db');
connection();
// const connection_db = require('./db');
// connection_db();
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// app.use('/',(req,res)=>{
//     console.log("test successfull");
//     res.send("testing....")
// })

app.use('/user', require('./Routes/createuser'));
app.use('/products', require('./Routes/productroute'));

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})