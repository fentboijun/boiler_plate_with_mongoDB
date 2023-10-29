import express from "express";
import mongoose from "mongoose";
import mongoSetting from "./mongoSetting.js";
import User from "./models/User.js";
import bodyParser from "body-parser";
const app = express();
const port = 8080;
// 몽고 DB연결
mongoose
  .connect(
    `mongodb+srv://${mongoSetting.userName}:${mongoSetting.password}@${mongoSetting.dbName}.3vjerv8.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.error(err));
// 바디파서 사용
// app use를 이용하여 등록함
// application/x-www-form-urlencoded 분석해서 가져올수있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 분석해서 가져올수있게
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// user Create 작업
app.post("/register", async (req, res) => {
  //회원가입시 필요 정보를 client에서 가져오면
  //데이터베이스에 삽입한다

  //body parser를 통해 body에 담긴 정보를 가져온다
  const user = new User(req.body);

  //mongoDB 메서드, user모델에 저장
  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});
app.post("/login", async (req, res) => {
  // mongo에서 요청된 이메일을 데이터 베이스에서 있는지 찾기
  // 비밀번호 까지 확인
  // 맞다면 토큰 생성 후 집어넣기
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      }
      user.checkPw(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 일치하지 않습니다.",
          });
        user.createToken((err, user) => {});
      });
    })
    .catch((err) => {
      res.json({ loginSuccess: false, err });
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
