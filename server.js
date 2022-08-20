const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

app.use(cors());



app.get('/', (req, res) => {
    res.json('hello world')
})

const tech = [
    {
        _id:"1",
        name: "React"
    },
    {
        _id:"2",
        name: "Node"
    }
]

app.get('/tech', (req,res)=>{
    res.json(tech)
})


const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {
        console.log('connected successfully to DB');
        app.listen(PORT, () => {
            console.log(`port is listening on port ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })