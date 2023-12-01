const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");
const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

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
app.post('/api/users/register', async (req, res) => {
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

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스 찾기
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: '제공된 이메일에 해당하는 유저가 없습니다.'
        })
      }
      // 요청한 이메일이 있다면 비밀번호가 맞는지 확인한다.
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch)
          return res.json({ loginSuccess: false, message: "비밀번호가 맞지 않습니다."})

        // 비밀번호까지 같다면 토큰을 생성하기.
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
          res.cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id})
        })
      })
    })
    .catch((err) => {
      return res.status(400).send(err);
    })
})

app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role !== 0,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id},{token: ""})
    .then(() => {
      return res.status(200).send(
        {success: true}
      )
  }).catch((err) => {
    res.json({success: false, err})
  })
})

// Router <- Express에서 제공되는 것을 이용해 이후 정리 예정.

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));