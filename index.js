import  express  from 'express';
import mongoose  from 'mongoose';
import mongoSetting from './mongoSetting.js';
const app = express();
const port = 8080;
// 몽고 DB연결
mongoose.connect(`mongodb+srv://${mongoSetting.userName}:${mongoSetting.password}@${mongoSetting.dbName}.3vjerv8.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(() => console.log('MongoDb connected'))
.catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})