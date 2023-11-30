const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

// import mongoose from 'mongoose';
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI).then(
  () => console.log('MongoDB Connected...')
).catch(
  err => console.log(err)
)

app.get('/', (req, res) => {
  res.send('Hello world! ~안녕하세용~ 히히')
});

// mongoose가 버전 업이 되며 콜백을 허용하지 않아서 async와 await로 처리해야 함.
app.post('/register', async (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)

  const result = await user.save().then(()=> {
    res.status(200).json({
      success: true
    })
  }).catch((err) => {
    res.json({
      success: false, err
    })
  })
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));