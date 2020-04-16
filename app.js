const express = require("express");
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const {MONGO_URI} = require('./keys');

const User = require('./models/user');

app.use(express.json());

app.use(require('./routes/auth'));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log("connected to database!!!");
})
mongoose.connection.on('error', (error) => {
    console.log("error connecting: ", error.message);
})



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} `);
})