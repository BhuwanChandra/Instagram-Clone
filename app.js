const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require("./config/keys");

const User = require("./models/user");
const Post = require("./models/post");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch(err => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("connected to database!!!");
});

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));


if(process.env.NODE_ENV == "production"){
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} `);
});
