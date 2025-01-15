const express = require('express')
var path = require('path')
var session = require('express-session')
var settingsRouter = require('./routes/settings.route')
var homeRouter = require('./routes/home.route')
var apinewsanpham = require('./routes/apinewsanpham')
var sanphammoi=require('./routes/sanpham')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
const app = express()
const MongoStore = require('connect-mongo')
var db = require('./models/db')
const uri =
  'mongodb+srv://trafdual:trafdual@cluster0.jsm1k.mongodb.net/baominhstore?retryWrites=true&w=majority'

const mongoStoreOptions = {
  mongooseConnection: db.mongoose.connection,
  mongoUrl: uri,
  collection: 'sessions'
}
const cors = require('cors')

app.use(cors())

// app.set('view engine', 'ejs');
// view engine setup
app.use(
  session({
    secret: 'adscascd8saa8sdv87ds78v6dsv87asvdasv8',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create(mongoStoreOptions)
    // ,cookie: { secure: true }
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use('/', homeRouter)

// app.use('/api', apiAccRouter);
// app.use('/accounts', accountsRouter);
app.use('/', settingsRouter)
// app.use('/',sitmaprouter);

// app.use('/test', testRouter);
app.use('/', apinewsanpham)
app.use('/', sanphammoi)


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/uploads')))

// // Backup specific collection using Mongoose model
// mongoose.connection.on(
//   'error',
//   console.error.bind(console, 'MongoDB connection error:')
// )
// mongoose.connection.once('open', async () => {
//   console.log('Successfully connected to MongoDB Atlas')

//   try {
//     // Sử dụng mô hình Mongoose để truy xuất dữ liệu từ collection 'chitietsp'
//     const data = await ChitietSp.UserModel.find({}).exec()

//     // Kiểm tra dữ liệu có tồn tại không
//     if (data.length === 0) {
//       console.log('No data found in the collection.')
//       return
//     }

//     // Thư mục backup
//     const backupDir = path.join(__dirname, 'backup')
//     if (!fs.existsSync(backupDir)) {
//       fs.mkdirSync(backupDir)
//     }

//     // Lưu dữ liệu vào file JSON
//     const filePath = path.join(backupDir, `user.json`)
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

//     console.log('Backup completed for collection: chitietsp')

//     console.log('Collection has been backed up successfully!')
//   } catch (error) {
//     console.error('Error during backup:', error)
//   } finally {
//     // Ngắt kết nối sau khi hoàn tất
//     mongoose.disconnect()
//   }
// })


app.listen(3000, () => {
  console.log('Server is running on port 3000')
  console.log(__dirname)
})
module.exports = app

