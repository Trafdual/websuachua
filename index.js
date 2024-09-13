const fs = require('fs')
const https = require('https')
const express = require('express')
const path = require('path')
const session = require('express-session')
const Notify = require('./models/NotifyModel')
const settingsRouter = require('./routes/settings.route')
const apinewsanpham = require('./routes/apinewsanpham')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')
const WebSocket = require('ws')
const moment = require('moment')
const app = express()
const db = require('./models/db')

const uri =
  'mongodb+srv://trafdual:trafdual@cluster0.jsm1k.mongodb.net/baominhstore?retryWrites=true&w=majority&appName=Cluster0'

const mongoStoreOptions = {
  mongooseConnection: db.mongoose.connection,
  mongoUrl: uri,
  collection: 'sessions'
}

// Load SSL/TLS certificates
const privateKey = fs.readFileSync(
  path.join(__dirname, 'ssl', 'privatekey.pem'),
  'utf8'
)
const certificate = fs.readFileSync(
  path.join(__dirname, 'ssl', 'certificate.pem'),
  'utf8'
)

const credentials = { key: privateKey, cert: certificate }

// Set up HTTPS server
const server = https.createServer(credentials, app)
const wss = new WebSocket.Server({ server })

// Express middleware
app.use(
  session({
    secret: 'adscascd8saa8sdv87ds78v6dsv87asvdasv8',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create(mongoStoreOptions)
  })
)

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use('/', settingsRouter)
app.use('/', apinewsanpham)

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/uploads')))
app.use(express.static(path.join(__dirname, '/ssl')))

// WebSocket setup
wss.on('connection', ws => {
  console.log('Client connected')

  const checkForUpdates = () => {
    Notify.notify.find().then(donhang => {
      const donHangIsReadTrue = donhang
        .filter(d => d.isRead === true)
        .map(d => ({
          _id: d._id,
          tenkhach: d.tenkhach,
          phone: d.phone,
          email: d.email,
          address: d.address,
          tensp: d.tensp,
          price: d.price,
          date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
        }))

      const donHangIsReadFalse = donhang
        .filter(d => d.isRead === false)
        .map(d => ({
          _id: d._id,
          tenkhach: d.tenkhach,
          phone: d.phone,
          email: d.email,
          address: d.address,
          tensp: d.tensp,
          price: d.price,
          date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
        }))

      ws.send(JSON.stringify({ donHangIsReadTrue, donHangIsReadFalse }))
    })

    setTimeout(checkForUpdates, 1000)
  }

  checkForUpdates()
})

server.listen(3000, () => {
  console.log('HTTPS server is running on port 3000')
})
