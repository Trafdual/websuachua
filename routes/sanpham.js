const express = require('express')
const router = express.Router()
const Sp = require('../models/chitietSpModel')
const LoaiSP = require('../models/tenSpModel')
const DungLuong = require('../models/dungluongModel')
const moment = require('moment')
const momenttimezone = require('moment-timezone')
const MauSac = require('../models/MauSacModel')
const test = require('../models/tesmodel')
let clients = []
let hasSentMessage = false

router.get('/events', (req, res) => {
  console.log('Client connected to events API') // Thông báo khi có client kết nối
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()
  try {
    clients.push(res)

    // Dọn dẹp khi client ngắt kết nối
    req.on('close', () => {
      clients = clients.filter(client => client !== res)
      console.log('Client disconnected from events API')
    })
  } catch (error) {
    console.error('Error in events API:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Hàm gửi sự kiện cho tất cả client
const sendEvent = data => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}
router.get('/testmodel', async (req, res) => {
  try {
    const test1 = await test.testmodel.find().lean()
    res.json(test1)
  } catch (error) {
    console.log(error)
  }
})

router.post('/posttestmodel', async (req, res) => {
  try {
    const { name } = req.body
    const test1 = new test.testmodel({ name })
    await test1.save()
    sendEvent({ message: `Sản phẩm mới đã được thêm: ${name}` })
    res.json(test1)
  } catch (error) {
    console.log(error)
    res.json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/postdungluong/:idloaisp', async (req, res) => {
  try {
    const idloaisp = req.params.idloaisp
    const { name } = req.body
    const loaisp = await LoaiSP.TenSP.findById(idloaisp)
    const dungluong = new DungLuong.dungluong({ name })
    loaisp.dungluongmay.push(dungluong._id)
    await dungluong.save()
    await loaisp.save()
    res.redirect(`/dungluong/${loaisp._id}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/dungluong/:idloaisp', async (req, res) => {
  try {
    const idloaisp = req.params.idloaisp
    const loaisp = await LoaiSP.TenSP.findById(idloaisp)
    const dungluong = await Promise.all(
      loaisp.dungluongmay.map(async dl => {
        const dluong = await DungLuong.dungluong.findById(dl._id)
        return {
          _id: dluong._id,
          name: dluong.name
        }
      })
    )
    res.render('sanphammoi/dungluong.ejs', { dungluong, idloaisp })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/deletedungluong/:iddungluong/:idloaisp', async (req, res) => {
  try {
    const iddungluong = req.params.iddungluong
    const idloaisp = req.params.idloaisp
    const loaisp = await LoaiSP.TenSP.findById(idloaisp)
    const dungluong = await DungLuong.dungluong.findById(iddungluong)
    loaisp.dungluongmay = loaisp.dungluongmay.filter(
      dungluong1 => dungluong1.toString() !== dungluong._id
    )
    await loaisp.save()
    await DungLuong.dungluong.findByIdAndDelete(iddungluong)
    res.redirect(`/dungluong/${idloaisp}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getadddungluong/:idloaisp', async (req, res) => {
  try {
    const idloaisp = req.params.idloaisp
    const loaisp = await LoaiSP.TenSP.findById(idloaisp)
    res.render('sanphammoi/addduluong.ejs', { idloaisp: loaisp._id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/postmausac/:iddungluong', async (req, res) => {
  try {
    const iddungluong = req.params.iddungluong
    const dungluong = await DungLuong.dungluong.findById(iddungluong)
    const { name } = req.body
    const mausac = new MauSac.mausac({ name })
    dungluong.mausac.push(mausac._id)
    await mausac.save()
    await dungluong.save()
    res.redirect(`/mausac/${iddungluong}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/mausac/:iddungluong', async (req, res) => {
  try {
    const iddungluong = req.params.iddungluong
    const dungluong = await DungLuong.dungluong.findById(iddungluong)
    const mausac = await Promise.all(
      dungluong.mausac.map(async ms => {
        const maus = await MauSac.mausac.findById(ms._id)
        return {
          _id: maus._id,
          name: maus.name
        }
      })
    )
    res.render('sanphammoi/mausac.ejs', { mausac, iddungluong })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getaddmausac/:iddungluong', async (req, res) => {
  try {
    const iddungluong = req.params.iddungluong
    res.render('sanphammoi/addmausac.ejs', { iddungluong })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.get('/getputmausac/:idmausac/:idungluong', async (req, res) => {
  try {
    const idmausac = req.params.idmausac
    const idungluong = req.params.idungluong
    const mausac = await MauSac.mausac.findById(idmausac)
    res.render('sanphammoi/putmausac.ejs', { idmausac, mausac, idungluong })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/putmausac/:idmausac/:idungluong', async (req, res) => {
  try {
    const { name } = req.body
    const iddungluong = req.params.idungluong
    const idmausac = req.params.idmausac
    const mausac = await MauSac.mausac.findById(idmausac)
    mausac.name = name
    await mausac.save()
    res.redirect(`/mausac/${iddungluong}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/phantram/:idmausac', async (req, res) => {
  try {
    const idmausac = req.params.idmausac
    const mausac = await MauSac.mausac.findById(idmausac)
    const phantram = await Promise.all(
      mausac.chitiet.map(ct => {
        return {
          _id: ct._id,
          name: ct.name,
          price: ct.price
        }
      })
    )
    res.render('sanphammoi/phantram.ejs', { phantram, idmausac })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getaddphantram/:idmausac', async (req, res) => {
  try {
    const idmausac = req.params.idmausac
    res.render('sanphammoi/addphamtram.ejs', { idmausac })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/postphantram/:idmausac', async (req, res) => {
  try {
    const idmausac = req.params.idmausac
    const mausac = await MauSac.mausac.findById(idmausac)
    const { name, price } = req.body
    mausac.chitiet.push({ name, price })
    await mausac.save()
    res.redirect(`/phantram/${idmausac}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.get('/geteditphantram/:idmausac/:id', async (req, res) => {
  try {
    const idmausac = req.params.idmausac
    const id = req.params.id
    const mausac = await MauSac.mausac.findById(idmausac)
    const index = mausac.chitiet.findIndex(ct => ct._id.toString() === id)
    const phantram = {
      name: mausac.chitiet[index].name,
      price: mausac.chitiet[index].price
    }
    res.render('sanphammoi/editphantram.ejs', { phantram, idmausac, id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.post('/editphantram/:idmausac/:id', async (req, res) => {
  try {
    const idmausac = req.params.idmausac
    const id = req.params.id
    const { name, price } = req.body
    const mausac = await MauSac.mausac.findById(idmausac)
    const index = mausac.chitiet.findIndex(ct => ct._id.toString() === id)

    if (index !== -1) {
      mausac.chitiet[index].name = name
      mausac.chitiet[index].price = price
    } else {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy id trong danh sách phần trăm' })
    }
    await mausac.save()

    res.redirect(`/phantram/${idmausac}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

module.exports = router
