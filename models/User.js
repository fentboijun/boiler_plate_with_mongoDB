import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;
// salt암호화 saltRounds = salt.length
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    // trim 은 공백제거 여부
    // fent boi jun@gmail.com ->
  },
  password: {
    type: String,
    maxlength: 100,
  },
  role: {
    type: Number,
    default: 0,
    // 0 유저
    // 2 관리자
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// save 하기 전에 할 작업들
userSchema.pre("save", function(next){
  // 위 스키마 지정
  const user = this;
  console.log(user);
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // salt 생성에 실패하면 에러 리턴
      if (err) return next(err);
      // 암호화
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // 암호화 성공되면 위 스키마의 password 값을 hash값으로 바꿈
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});
// 그 이후 저장
userSchema.methods.checkPw = function(plainPassword,cb){

    bcrypt.compare(plainPassword,this.password,function (err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}
const User = mongoose.model("User", userSchema);

export default User;
