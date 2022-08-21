const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const patientRouter = require('./routes/patientsRoutes');
const AppointmentRouter = require('./routes/appointmentsRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/patients', patientRouter);
app.use('/appointments', AppointmentRouter);

app.get('/', (req, res) => {
    res.json('hello world')
})

const tech = [
    {
        _id: "1",
        name: "React"
    },
    {
        _id: "2",
        name: "Node"
    }
]

app.get('/tech', (req, res) => {
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
    .catch((error) => {
        console.log(error);
    })