// config inicial
const express = require('express')
const app = express()

// depois do db
const mongoose = require('mongoose')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
app.use(express.static('uploads'));

// rotas
const tratorRoutes = require('./routes/tratorRoutes')

app.use('/trator', tratorRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

mongoose
  .connect(
    'mongodb+srv://arturw9:ddtankw9100@cluster0.wd4ow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))