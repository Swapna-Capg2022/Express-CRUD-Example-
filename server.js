const express = require('express');
const cors = require('cors');

const dbConfig = require('./dbconfig/database.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// connection to mongodb using mongoose
mongoose.connect(dbConfig.url,{
    useNewUrlParser :true
}).then(() =>{
    console.log("DB Connected successfully....")
}).catch(err =>{
    console.log("Could not Connect DB successfully....",err)
    process.exit();
})

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json())

const UserRoute = require('./app/routes/UserRoutes')
app.use('/user',UserRoute);

const CountryRoute = require('./app/routes/CountryRoutes')
app.use("/country",CountryRoute)

app.listen(4500,function(){
    console.log("Server listening to Port no 4500")
})

app.get('/',(req,res)=>{
    res.send("hello from express crud");
})

app.post('/display',(req,res)=>{
    console.log("in post method")
    console.log(req.body)
})