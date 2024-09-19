const express = require('express')
const router = express.Router()
const Sp = require('../models/chitietSpModel')
const LoaiSP = require('../models/tenSpModel')
const DungLuong = require('../models/dungluongModel')
const moment = require('moment')
const momenttimezone = require('moment-timezone')
const MauSac = require('../models/MauSacModel')
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
    res.render('sanphammoi/dungluong.ejs', { dungluong,idloaisp })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getadddungluong/:idloaisp', async (req, res) => {
  try {
    const idloaisp = req.params.idloaisp
    const loaisp = await LoaiSP.TenSP.findById(idloaisp)
    res.render('sanphammoi/addduluong.ejs', { idloaisp:loaisp._id })
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
    res.render('sanphammoi/mausac.ejs', { mausac,iddungluong })
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

router.get('/phantram/:idmausac', async (req, res) => {
  try {
    const idmausac = req.params.idmausac
    const mausac = await MauSac.mausac.findById(idmausac)
    const phantram = await Promise.all(
      mausac.chitiet.map(ct => {
        return {
          name: ct.name,
          price: ct.price
        }
      })
    )
    res.render('sanphammoi/phantram.ejs', { phantram,idmausac })
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

module.exports = router
