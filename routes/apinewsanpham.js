const express = require('express')
const router = express.Router()
const uploads = require('./upload')
const Sp = require('../models/chitietSpModel')
const LoaiSP = require('../models/tenSpModel')
const multer = require('multer')
var myMDBlog = require('../models/blog.model')
const checkAuth = require('../controllers/checkAuth')
const checkAuth2 = require('../controllers/checkAuth2')
const DungLuong = require('../models/dungluongModel')
const MauSac = require('../models/MauSacModel')

const LinkKien = require('../models/LinkKienModel')
const LoaiLinkKien = require('../models/LoaiLinhKien')
const Notify = require('../models/NotifyModel')
const DanhGia = require('../models/DanhGiaModel')
const moment = require('moment')
const momenttimezone = require('moment-timezone')
const unicode = require('unidecode')

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

router.get('/mess', async (req, res) => {
  res.render('home/mess.ejs')
})
router.post('/postloaisp', async (req, res) => {
  try {
    const {
      name,
      manhinh,
      chip,
      ram,
      dungluong,
      camera,
      pinsac,
      hang,
      congsac,
      thongtin
    } = req.body
    const tensp = new LoaiSP.TenSP({
      name,
      manhinh,
      chip,
      ram,
      dungluong,
      camera,
      pinsac,
      hang,
      congsac,
      thongtin
    })
    await tensp.save()
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.get('/gift1/:idnotify', async (req, res) => {
  try {
    const idnotify = req.params.idnotify
    const notify = await Notify.notify.findById(idnotify)
    let message
    let message2
    if (notify.isRead === false) {
      message = 'chưa được duyệt'
    } else {
      message = 'thành công'
      if (notify.isQuay === true) {
        message2 = 'hết lượt'
      }
    }

    res.render('home/gift.ejs', { message, message2, idnotify })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.get('/gift', async (req, res) => {
  res.render('home/gift1.ejs')
})
router.get('/notify-status/:idnotify', async (req, res) => {
  try {
    const idnotify = req.params.idnotify
    const notify = await Notify.notify.findById(idnotify)

    if (notify) {
      res.json({ isRead: notify.isRead })
    } else {
      res.status(404).json({ message: 'Notification not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/putloaisp/:id', async (req, res) => {
  try {
    const id = req.params.id
    const {
      name,
      manhinh,
      chip,
      ram,
      dungluong,
      camera,
      pinsac,
      hang,
      congsac,
      thongtin
    } = req.body
    await LoaiSP.TenSP.findByIdAndUpdate(id, {
      name,
      manhinh,
      chip,
      ram,
      dungluong,
      camera,
      pinsac,
      hang,
      congsac,
      thongtin
    })
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/editloaisp/:id', async (req, res) => {
  try {
    const id = req.params.id
    const tensp = await LoaiSP.TenSP.findById(id)
    res.render('home/editloaisp.ejs', { tensp })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/addloaisp', async (req, res) => {
  try {
    res.render('home/addloaisp.ejs')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/addsp/:idloaisp', async (req, res) => {
  try {
    const idloaisp = req.params.idloaisp
    res.render('home/add.ejs', { idloaisp })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/main', checkAuth, async (req, res) => {
  try {
    let listloai = await LoaiSP.TenSP.find()
    let listblog = await myMDBlog.blogModel.find()
    const loailinhkien = await LoaiLinkKien.loailinkkien.find()
    res.render('home/home.ejs', { listloai, listblog, loailinhkien })
  } catch (error) {
    console.log(`lỗi: ${error}`)
  }
})

router.get('/', async (req, res) => {
  try {
    const allsp = await LoaiSP.TenSP.find().populate({
      path: 'chitietsp',
      select: 'name content price image' // Chọn các trường cần thiết
    })

    const listBl = await myMDBlog.blogModel.find().sort({ _id: -1 }).limit(3)
    const danhgia = await DanhGia.danhgia.find()

    const tenspjson = await Promise.all(
      allsp.map(async tensp => {
        const chitietspJson = await Promise.all(
          tensp.chitietsp.map(async chitietsp => {
            return {
              id: chitietsp._id,
              name: chitietsp.name,
              noidung: chitietsp.content,
              price: chitietsp.price,
              image: chitietsp.image
            }
          })
        )
        return {
          id: tensp._id,
          name: tensp.name,
          chitietsp: chitietspJson
        }
      })
    )

    const danhgiaIsReadTrue = danhgia
      .filter(d => d.isRead === true)
      .map(d => ({
        _id: d._id,
        tenkhach: d.tenkhach,
        content: d.content,
        rating: d.rating
      }))
    res.render('home/index.ejs', { tenspjson, listBl, danhgiaIsReadTrue })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/deleteloaisp/:id', async (req, res) => {
  try {
    const id = req.params.id
    const xam = await LoaiSP.TenSP.findById(id)
    if (!xam) {
      res.status(403).json({ message: 'khong tim thay sp' })
    }
    await Promise.all(
      xam.chitietsp.map(async chitietsp => {
        await Sp.ChitietSp.findByIdAndDelete(chitietsp._id)
      })
    )
    await LoaiSP.TenSP.deleteOne({ _id: id })
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post(
  '/postchitietsp/:id',
  uploads.fields([
    { name: 'image', maxCount: 1 } // Một ảnh duy nhất
  ]),
  async (req, res) => {
    try {
      const id = req.params.id
      const { name, content, price } = req.body
      const domain = 'https://www.baominhmobile.com' // Thay đổi thành domain của bạn

      // Lấy tên file ảnh từ req.files và thêm domain vào trước tên file
      const image = req.files['image']
        ? `${domain}/${req.files['image'][0].filename}`
        : null

      const chitietsp = new Sp.ChitietSp({ image, name, content, price })
      const tensp = await LoaiSP.TenSP.findById(id)
      if (!tensp) {
        res.status(403).json({ message: 'khong tim thay tensp' })
      }
      chitietsp.idloaisp = id
      chitietsp.loaisp = tensp.name
      tensp.chitietsp.push(chitietsp._id)
      await chitietsp.save()
      await tensp.save()
      res.redirect('/main')
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
    }
  }
)

router.get('/getchitietsp/:idloaisp', async (req, res) => {
  try {
    const idloaisp = req.params.idloaisp
    const loaisp = await LoaiSP.TenSP.findById(idloaisp)
    if (!loaisp) {
      return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' })
    }

    const chitiet = await Promise.all(
      loaisp.chitietsp.map(async ct => {
        const chitietsp = await Sp.ChitietSp.findById(ct._id)
        return {
          _id: chitietsp._id,
          image: chitietsp.image,
          name: chitietsp.name,
          content: chitietsp.content,
          price: chitietsp.price
        }
      })
    )
    res.render('home/chitietsp.ejs', { chitiet, idloaisp })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getspchitiet/:nameloaisp', async (req, res) => {
  try {
    const nameloaisp = req.params.nameloaisp.replace(/-/g, ' ')
    const loaisp = await LoaiSP.TenSP.findOne({ name: nameloaisp })
    const tenloai = await LoaiSP.TenSP.find().lean()

    if (!loaisp) {
      return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' })
    }

    // Lấy số trang từ query string, mặc định là trang 1
    const page = parseInt(req.query.page) || 1
    const limit = 9 // Số sản phẩm mỗi trang
    const skip = (page - 1) * limit // Số lượng sản phẩm cần bỏ qua

    // Lấy danh sách sản phẩm và tổng số sản phẩm
    const allChitiet = await Promise.all(
      loaisp.chitietsp
        .sort(() => Math.random() - 0.5)
        .map(async ct => {
          const chitietsp = await Sp.ChitietSp.findById(ct._id)
          return {
            _id: chitietsp._id,
            image: chitietsp.image,
            name: chitietsp.name,
            content: chitietsp.content,
            price: chitietsp.price
          }
        })
    )

    // Phân trang sản phẩm
    const paginatedChitiet = allChitiet.slice(skip, skip + limit)
    const totalProducts = allChitiet.length
    const totalPages = Math.ceil(totalProducts / limit)

    res.render('home/shop.ejs', {
      chitiet: paginatedChitiet,
      tenloai,
      nameloaisp,
      totalPages,
      currentPage: page
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/search-products', async (req, res) => {
  try {
    const query = req.query.query || '' // Từ khóa tìm kiếm
    const page = parseInt(req.query.page, 10) || 1 // Trang hiện tại, mặc định là 1
    const limit = 9 // Số sản phẩm mỗi trang
    const skip = (page - 1) * limit // Số lượng sản phẩm cần bỏ qua
    const tenloai = await LoaiSP.TenSP.find().lean()

    // Phân tách từ khóa thành các phần
    const searchTerms = query
      .split(/\s+/)
      .map(term => term.trim())
      .filter(term => term.length > 0)
    const regex = new RegExp(searchTerms.join('.*'), 'i') // Biểu thức chính quy tìm kiếm các từ khóa

    // Tìm kiếm sản phẩm dựa trên từ khóa
    const searchResults = await Sp.ChitietSp.find({
      name: { $regex: regex }
    })
      .populate('idloaisp', 'name')
      .skip(skip)
      .limit(limit)
      .lean()

    // Đếm tổng số sản phẩm khớp với tìm kiếm
    const totalProducts = await Sp.ChitietSp.countDocuments({
      name: { $regex: regex }
    })

    const totalPages = Math.ceil(totalProducts / limit)

    // Render kết quả tìm kiếm
    res.render('home/shop2.ejs', {
      chitiet: searchResults,
      tenloai, // Có thể để trống hoặc lấy dữ liệu liên quan nếu cần
      nameloaisp: query, // Truyền từ khóa tìm kiếm cho giao diện
      totalPages,
      currentPage: page
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getchitiet/:namesp/:nameloai', async (req, res) => {
  try {
    const namesp = req.params.namesp.replace(/-/g, ' ').replace(/pt/g, '%')
    const nameloai = req.params.nameloai.replace(/-/g, ' ').replace(/pt/g, '%')

    const sp = await Sp.ChitietSp.findOne({ name: namesp })
    const tenloai = await LoaiSP.TenSP.find().lean()
    const page = parseInt(req.query.page, 10) || 1
    const theloai = await LoaiSP.TenSP.findOne({ name: nameloai })

    if (!sp) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
    }

    const loai = await LoaiSP.TenSP.findOne({ name: nameloai })
    if (!loai) {
      return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' })
    }
    const dungluong = await Promise.all(
      theloai.dungluongmay.map(async dl => {
        const dungluongmay = await DungLuong.dungluong.findById(dl._id)
        if (!dungluongmay) return null // Kiểm tra nếu dungluongmay tồn tại

        const mausac = await Promise.all(
          dungluongmay.mausac.map(async ms => {
            const mausacmay = await MauSac.mausac.findById(ms._id)
            if (!mausacmay) return null // Kiểm tra nếu mausacmay tồn tại
            return {
              mausacmay: mausacmay.name,
              chitiet: mausacmay.chitiet.map(ct => {
                return {
                  name: ct.name,
                  price: ct.price
                }
              })
            }
          })
        )

        // Lọc các giá trị null từ mausac
        const filteredMausac = mausac.filter(ms => ms !== null)

        return {
          name: dungluongmay.name,
          mausac: filteredMausac // Chỉ trả về mausac đã được lọc
        }
      })
    )

    // Lọc các giá trị null và loại bỏ các mảng rỗng
    const filteredDungluong = dungluong.filter(
      dl => dl !== null && dl.mausac.length > 0
    )

    const spjson = {
      image: sp.image,
      name: sp.name,
      price: sp.price,
      content: sp.content,
      manhinh: loai.manhinh,
      chip: loai.chip,
      ram: loai.ram,
      dungluong: loai.dungluong,
      camera: loai.camera,
      pinsac: loai.pinsac,
      congsac: loai.congsac,
      hang: loai.hang,
      thongtin: loai.thongtin
    }

    const mangloai = await Promise.all(
      sp.chitiet.map(async mang => {
        return {
          name: mang.name,
          price: mang.price
        }
      })
    )

    const mangjson = {
      spjson: spjson,
      mangloai: mangloai,
      dungluong: filteredDungluong
    }

    res.render('home/single-product.ejs', {
      mangjson,
      nameloai,
      namesp,
      tenloai,
      currentPage: page
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/postloaichitiet/:chitietspid', async (req, res) => {
  try {
    const chitietspid = req.params.chitietspid
    const { name, price } = req.body
    const chitietsp = await Sp.ChitietSp.findById(chitietspid)
    chitietsp.chitiet.push({ name, price })
    await chitietsp.save()
    res.redirect(`/getloaichitiet/${chitietspid}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/editloaichitiet/:chitietspid/:id', async (req, res) => {
  try {
    const chitietspid = req.params.chitietspid
    const { name, price } = req.body
    const chitietsp = await Sp.ChitietSp.findById(chitietspid)
    const id = req.params.id
    const index = chitietsp.chitiet.findIndex(
      item => item._id.toString() === id
    )
    if (index !== -1) {
      chitietsp.chitiet[index].name = name
      chitietsp.chitiet[index].price = price
    } else {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy id trong danh sách chitiet' })
    }

    await chitietsp.save()

    res.redirect(`/getloaichitiet/${chitietspid}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/geteditloaichitiet/:chitietspid/:id', async (req, res) => {
  try {
    const chitietspid = req.params.chitietspid
    const id = req.params.id
    const chitietsp = await Sp.ChitietSp.findById(chitietspid)
    const index = chitietsp.chitiet.findIndex(
      item => item._id.toString() === id
    )
    const json = {
      name: chitietsp.chitiet[index].name,
      price: chitietsp.chitiet[index].price
    }

    res.render('home/editloaichitiet.ejs', { chitietspid, id, json })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/deleteloaichitiet/:chitietspid/:id', async (req, res) => {
  try {
    const chitietspid = req.params.chitietspid
    const id = req.params.id
    const chitietsp = await Sp.ChitietSp.findById(chitietspid)
    const updatedChitiet = chitietsp.chitiet.filter(item => item._id != id)

    chitietsp.chitiet = updatedChitiet

    await chitietsp.save()
    res.redirect(`/getloaichitiet/${chitietspid}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getaddloaichitiet/:chitietspid', async (req, res) => {
  try {
    const chitietspid = req.params.chitietspid
    res.render('home/addloaichitiet.ejs', { chitietspid })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getloaichitiet/:idsp', async (req, res) => {
  try {
    const idsp = req.params.idsp
    const sp = await Sp.ChitietSp.findById(idsp)
    if (!sp) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
    }
    const mangloai = await Promise.all(
      sp.chitiet.map(async mang => {
        return {
          _id: mang._id,
          name: mang.name,
          price: mang.price
        }
      })
    )

    // res.json(mangjson)
    res.render('home/loaichitietsp.ejs', { mangloai, idsp })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/deletechitietsp/:id', async (req, res) => {
  try {
    const id = req.params.id
    const chitietsp = await Sp.ChitietSp.findById(id)
    if (!chitietsp) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy chi tiết sản phẩm' })
    }
    const loaisp = await LoaiSP.TenSP.findById(chitietsp.idloaisp)
    loaisp.chitietsp = loaisp.chitietsp.filter(
      chitiet => chitiet.toString() !== id
    )
    await loaisp.save()

    await Sp.ChitietSp.deleteOne({ _id: id })

    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/updatechitietsp/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name, content, price, image } = req.body

    const chitietsp = await Sp.ChitietSp.findById(id)
    if (!chitietsp) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy chi tiết sản phẩm' })
    }

    chitietsp.content = content
    chitietsp.price = price
    chitietsp.name = name
    chitietsp.image = image

    await chitietsp.save()

    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/editsp/:id', async (req, res) => {
  try {
    const id = req.params.id
    const sp = await Sp.ChitietSp.findById(id)
    res.render('home/edit.ejs', { sp })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/suachua', async (req, res) => {
  try {
    const loailinhkien = await LoaiLinkKien.loailinkkien
      .find()
      .populate('linhkien')
    const loailinhkienjson = await Promise.all(
      loailinhkien.map(async loai => {
        const linkkienJson = await Promise.all(
          loai.linhkien.map(async lk => {
            return {
              id: lk._id,
              name: lk.name,
              price: lk.price,
              image: lk.image
            }
          })
        )
        return {
          id: loai._id,
          name: loai.name,
          linkkienJson: linkkienJson
        }
      })
    )
    // res.json(loailinhkienjson)
    res.render('home/linkkien.ejs', { loailinhkienjson })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post(
  '/postlinkkien/:idloailinkkien',
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, price } = req.body
      const idloailinkkien = req.params.idloailinkkien
      const loailinhkien = await LoaiLinkKien.loailinkkien.findById(
        idloailinkkien
      )
      const image = req.file.buffer.toString('base64')
      const linkkien = new LinkKien.linkkien({ name, price, image })
      linkkien.loailinhkien = loailinhkien._id
      linkkien.loai = loailinhkien.name
      loailinhkien.linhkien.push(linkkien._id)
      await linkkien.save()
      await loailinhkien.save()
      res.redirect(`/linhkien/${idloailinkkien}`)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
    }
  }
)

router.get('/addlinhkien/:id', async (req, res) => {
  try {
    const id = req.params.id
    res.render('home/addlinhkien.ejs', { id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/editlinhkien/:id', async (req, res) => {
  try {
    const id = req.params.id
    const linhkien = await LinkKien.linkkien.findById(id)
    res.render('home/editlinhkien.ejs', { linhkien, id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/putlinhkien/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name, price } = req.body
    const linhkien = await LinkKien.linkkien.findById(id)
    linhkien.name = name
    linhkien.price = price
    await linhkien.save()
    res.redirect(`/linhkien/${linhkien.loailinhkien}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/deletelk/:id', async (req, res) => {
  try {
    const id = req.params.id
    const linhkien = await LinkKien.linkkien.findById(id)
    const loailinhkien = await LoaiLinkKien.loailinkkien.findById(
      linhkien.loailinhkien
    )
    loailinhkien.linhkien = loailinhkien.linhkien.filter(
      chitiet => chitiet.toString() !== id
    )
    await loailinhkien.save()

    await LinkKien.linkkien.deleteOne({ _id: id })

    res.redirect(`/linhkien/${linhkien.loailinhkien}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.post('/postloailinkien', async (req, res) => {
  try {
    const { name } = req.body
    const loailinkkien = new LoaiLinkKien.loailinkkien({ name })
    await loailinkkien.save()
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/putloailk/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name } = req.body
    const loailinhkien = await LoaiLinkKien.loailinkkien.findById(id)
    loailinhkien.name = name
    await loailinhkien.save()
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/deleteloailk/:id', async (req, res) => {
  try {
    const id = req.params.id
    const loailinhkien = await LoaiLinkKien.loailinkkien.findById(id)
    Promise.all(
      loailinhkien.linhkien.map(async linhkien => {
        await LinkKien.linkkien.findByIdAndDelete(linhkien._id)
      })
    )
    await LoaiLinkKien.loailinkkien.deleteOne({ _id: id })
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/addloailk', async (req, res) => {
  try {
    res.render('home/addloailinhkien.ejs')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/editloailk/:id', async (req, res) => {
  try {
    const id = req.params.id
    const loailinhkien = await LoaiLinkKien.loailinkkien.findById(id)
    res.render('home/editloailinhkien.ejs', { id, loailinhkien })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/linhkien/:id', async (req, res) => {
  try {
    const id = req.params.id
    const loailinhkien = await LoaiLinkKien.loailinkkien.findById(id)
    const linhkienjson = await Promise.all(
      loailinhkien.linhkien.map(async lk => {
        const linhkien = await LinkKien.linkkien.findById(lk._id)
        return {
          _id: linhkien.id,
          name: linhkien.name,
          price: linhkien.price,
          image: linhkien.image,
          loai: linhkien.loai
        }
      })
    )
    res.render('home/linhkienmain.ejs', { linhkienjson, id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/xemlinhkien/:id', async (req, res) => {
  try {
    const id = req.params.id
    const loailinhkien = await LoaiLinkKien.loailinkkien.findById(id)
    const linhkienjson = await Promise.all(
      loailinhkien.linhkien.map(async lk => {
        const linhkien = await LinkKien.linkkien.findById(lk._id)
        return {
          _id: linhkien.id,
          name: linhkien.name,
          price: linhkien.price,
          image: linhkien.image,
          loai: linhkien.loai
        }
      })
    )
    res.render('home/xemlinhkien.ejs', { linhkienjson, id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/muangay/:idsp', async (req, res) => {
  try {
    const idsp = req.params.idsp
    const sp = await Sp.ChitietSp.findById(idsp)
    const tenloai = await LoaiSP.TenSP.find().lean()
    const page = parseInt(req.query.page, 10) || 1

    const spjson = {
      name: sp.name,
      price: sp.price
    }
    // res.json(spjson)
    res.render('home/formmua.ejs', { spjson, tenloai, currentPage: page })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/postnotify', async (req, res) => {
  try {
    const { tenkhach, phone, email, tensp, price, address } = req.body
    const vietnamTime = momenttimezone().toDate()
    const notify = new Notify.notify({
      tenkhach,
      phone,
      email,
      tensp,
      price,
      address
    })
    const sp = await Sp.ChitietSp.findOne({ name: tensp })
    notify.idsp = sp._id
    notify.date = vietnamTime
    await notify.save()
    setTimeout(() => {
      res.redirect('/form')
    }, 2000)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.get('/form', async (req, res) => {
  res.render('home/baominh.ejs')
})
router.post('/postnotify1', async (req, res) => {
  try {
    const { tenkhach, phone, email, tensp, price, address, cccd } = req.body
    const vietnamTime = momenttimezone().toDate()
    const notify = new Notify.notify({
      tenkhach,
      phone,
      email,
      tensp,
      price,
      address,
      cccd
    })
    notify.date = vietnamTime
    await notify.save()
    req.session.idnotify = notify._id
    return res.json({ message: 'thành công', tbid: notify._id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.post('/postIsquay/:idnotify', async (req, res) => {
  try {
    const idnotify = req.params.idnotify
    const notify = await Notify.notify.findById(idnotify)
    notify.isQuay = true
    await notify.save()
    res.json({ message: 'thành công' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra l��i: ${error}` })
  }
})

router.post('/duyet/:idnotify', async (req, res) => {
  try {
    const idnotify = req.params.idnotify
    const notify = await Notify.notify.findById(idnotify)
    notify.isRead = true
    await notify.save()
    res.redirect('/donhang')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
router.post('/deletenotify/:idnotify', async (req, res) => {
  try {
    const idnotify = req.params.idnotify
    await Notify.notify.findByIdAndDelete(idnotify)
    res.redirect('/donhang')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra l��i: ${error}` })
  }
})
router.get('/orders/search', async (req, res) => {
  try {
    const searchQuery = req.query.query || ''
    const regex = new RegExp(searchQuery, 'i') // Tạo biểu thức chính quy không phân biệt chữ hoa chữ thường

    // Tìm kiếm đơn hàng đã được duyệt
    const donHangIsReadTrue = await Notify.notify.find({
      isRead: true,
      $or: [
        { tenkhach: regex },
        { phone: regex },
        { email: regex },
        { address: regex },
        { tensp: regex }
      ]
    })

    // Render HTML cho bảng kết quả tìm kiếm
    res.json({
      html: donHangIsReadTrue
        .map(
          row => `
                <tr>
                    <td>${row.tenkhach}</td>
                    <td><a href="">${row.phone}</a></td>
                    <td>${row.email}</td>
                    <td>${row.address}</td>
                    <td>${row.tensp}</td>
                    <td>${row.price}</td>
                    <td>${moment(row.date).format('DD/MM/YYYY HH:mm:ss')}</td>
                </tr>
            `
        )
        .join('')
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Đã xảy ra lỗi.' })
  }
})

router.get('/donhang', checkAuth2, async (req, res) => {
  try {
    const donhang = await Notify.notify.find()

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

    res.render('home/donhang.ejs', {
      donHangIsReadTrue,
      donHangIsReadFalse
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/donhang/longpoll', async (req, res) => {
  try {
    // Thay đổi thời gian chờ phù hợp với nhu cầu của bạn
    const timeout = 30000 // 30 giây
    const startTime = Date.now()

    const checkForUpdates = () => {
      // Kiểm tra dữ liệu cập nhật mới
      Notify.notify
        .find()
        .then(donhang => {
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

          if (donHangIsReadTrue.length > 0 || donHangIsReadFalse.length > 0) {
            res.json({ donHangIsReadTrue, donHangIsReadFalse })
          } else if (Date.now() - startTime > timeout) {
            res.json({ donHangIsReadTrue: [], donHangIsReadFalse: [] })
          } else {
            // Nếu không có cập nhật mới, tiếp tục chờ
            setTimeout(checkForUpdates, 1000) // 1 giây
          }
        })
        .catch(err => {
          console.error(err)
          res.status(500).json({ message: `Đã xảy ra lỗi: ${err}` })
        })
    }

    checkForUpdates()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/danhgia', async (req, res) => {
  try {
    const { tenkhach, content, rating } = req.body
    const vietnamTime = momenttimezone().toDate()
    const danhgia = new DanhGia.danhgia({
      tenkhach,
      content,
      rating,
      date: vietnamTime
    })
    await danhgia.save()
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/getdanhgia', async (req, res) => {
  try {
    const danhgia = await DanhGia.danhgia.find()

    const danhgiaIsReadTrue = danhgia
      .filter(d => d.isRead === true)
      .map(d => ({
        _id: d._id,
        tenkhach: d.tenkhach,
        content: d.content,
        rating: d.rating,
        date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
      }))

    const danhgiaIsReadFalse = danhgia
      .filter(d => d.isRead === false)
      .map(d => ({
        _id: d._id,
        tenkhach: d.tenkhach,
        content: d.content,
        rating: d.rating,
        date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
      }))

    res.render('home/danhgia.ejs', {
      danhgiaIsReadTrue,
      danhgiaIsReadFalse
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/duyetdanhgia/:iddanhgia', async (req, res) => {
  try {
    const iddanhgia = req.params.iddanhgia
    const danhgia = await DanhGia.danhgia.findById(iddanhgia)
    danhgia.isRead = true
    await danhgia.save()
    res.redirect('/getdanhgia')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/contentBlog/:tieude', async (req, res) => {
  try {
    const tieude_khongdau = decodeURIComponent(req.params.tieude).replace(
      /-/g,
      ' '
    )
    const blog = await myMDBlog.blogModel.findOne({ tieude_khongdau })

    if (!blog) {
      return res.status(404).json({ message: 'Blog không tồn tại' })
    }

    const listBl = await myMDBlog.blogModel.find().sort({ _id: -1 })

    const content = blog.noidung.map(noidung => {
      return {
        tieude: noidung.tieude,
        content: noidung.content.replace(
          /\\n/g,
          '<br>&nbsp;&nbsp;&nbsp;&nbsp;'
        ),
        img: noidung.img || ''
      }
    })

    res.render('home/chitietblog.ejs', {
      content,
      tieude: blog.tieude_blog,
      listBl,
      image_blog: blog.img_blog
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

function escapeRegExp (string) {
  // Hàm thoát ký tự đặc biệt trong biểu thức chính quy
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function removeSpecialChars (str) {
  // Danh sách các ký tự đặc biệt bạn muốn xóa
  const specialChars = /[:+,!@#$%^&*()-?/]/g // Thay đổi biểu thức chính quy theo các ký tự bạn muốn xóa

  // Xóa các ký tự đặc biệt
  return str.replace(specialChars, '')
}

function replaceKeywordsWithLinks (content, keywords, urlBase) {
  // Nếu keywords không phải là mảng, chuyển đổi nó thành mảng chứa một từ khóa duy nhất
  if (!Array.isArray(keywords)) {
    keywords = [keywords]
  }

  // Nếu không có từ khóa, trả lại nội dung gốc
  if (!keywords || keywords.length === 0) {
    return content
  }

  // Thay thế từng từ khóa bằng thẻ <a>
  keywords.forEach(keyword => {
    if (keyword === '') {
      return
    }
    // Thoát các ký tự đặc biệt trong từ khóa
    const escapedKeyword = escapeRegExp(keyword)
    // Tạo một biểu thức chính quy để tìm từ khóa
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi')
    // Thay thế từ khóa bằng thẻ <a> với đường link
    content = content.replace(regex, `<a href="${urlBase}">${keyword}</a>`)
  })

  return content
}

router.post('/postblog', async (req, res) => {
  try {
    const { tieude_blog, img, content, tieude, img_blog, keywords, urlBase } =
      req.body

    const tieude_khongdau1 = unicode(tieude_blog)
    const tieude_khongdau = removeSpecialChars(tieude_khongdau1)

    const blog = new myMDBlog.blogModel({
      tieude_blog,
      img_blog,
      tieude_khongdau
    })

    // Thêm các nội dung blog
    if (Array.isArray(content) && Array.isArray(img) && Array.isArray(tieude)) {
      for (let i = 0; i < content.length; i++) {
        const updatedContent = replaceKeywordsWithLinks(
          content[i],
          keywords[i],
          urlBase[i]
        )

        blog.noidung.push({
          content: updatedContent,
          img: img[i],
          tieude: tieude[i],
          keywords: keywords[i],
          urlBase: urlBase[i]
        })
      }
    } else {
      const updatedContent = replaceKeywordsWithLinks(
        content,
        keywords,
        urlBase
      )

      blog.noidung.push({
        content: updatedContent,
        img,
        tieude,
        keywords,
        keywords
      })
    }

    await blog.save()
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post(
  '/postblog2',
  uploads.fields([
    { name: 'imgblog', maxCount: 1 }, // Một ảnh duy nhất
    { name: 'img', maxCount: 100000 } // Nhiều ảnh (có thể điều chỉnh số lượng tối đa)
  ]),
  async (req, res) => {
    try {
      const { tieude_blog, content, tieude, keywords, urlBase } = req.body

      // Xác định domain
      const domain = 'https://www.baominhmobile.com' // Thay đổi thành domain của bạn

      // Lấy tên file ảnh từ req.files và thêm domain vào trước tên file
      const imgblog = req.files['imgblog']
        ? `${domain}/${req.files['imgblog'][0].filename}`
        : null
      const img = req.files['img']
        ? req.files['img'].map(file => `${domain}/${file.filename}`)
        : []

      const tieude_khongdau1 = unicode(tieude_blog)
      const tieude_khongdau = removeSpecialChars(tieude_khongdau1)

      const blog = new myMDBlog.blogModel({
        tieude_blog,
        img_blog: imgblog, // URL ảnh đơn
        tieude_khongdau
      })

      // Thêm các nội dung blog
      if (
        Array.isArray(content) &&
        Array.isArray(tieude) &&
        Array.isArray(keywords) &&
        Array.isArray(urlBase)
      ) {
        for (let i = 0; i < content.length; i++) {
          const updatedContent = replaceKeywordsWithLinks(
            content[i],
            keywords[i],
            urlBase[i]
          )

          blog.noidung.push({
            content: updatedContent,
            img: img[i] || null, // Sử dụng ảnh từ mảng hoặc null nếu không có
            tieude: tieude[i],
            keywords: keywords[i],
            urlBase: urlBase[i]
          })
        }
      } else {
        const updatedContent = replaceKeywordsWithLinks(
          content,
          keywords,
          urlBase
        )

        blog.noidung.push({
          content: updatedContent,
          img: img[0] || null, // Nếu chỉ có một ảnh, chọn ảnh đầu tiên hoặc null
          tieude,
          keywords,
          urlBase
        })
      }

      await blog.save()
      res.redirect('/main')
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
    }
  }
)

router.get('/getaddblog', async (req, res) => {
  res.render('home/addblog.ejs')
})
router.get('/getaddblogtest', async (req, res) => {
  res.render('home/test.ejs')
})

router.get('/getblog', async (req, res) => {
  try {
    const listBl = await myMDBlog.blogModel.find().sort({ _id: -1 })
    const tenloai = await LoaiSP.TenSP.find().lean()
    const page = parseInt(req.query.page, 10) || 1

    res.render('home/blog.ejs', { listBl, tenloai, currentPage: page })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post('/editblog/:idblog', async (req, res) => {
  try {
    const { tieude_blog, img_blog, tieude, content, img, keywords, urlBase } =
      req.body
    const idblog = req.params.idblog
    const blog = await myMDBlog.blogModel.findById(idblog)
    blog.tieude_blog = tieude_blog
    blog.img_blog = img_blog
    blog.tieude_khongdau = unicode(tieude_blog)

    if (Array.isArray(content) && Array.isArray(img) && Array.isArray(tieude)) {
      blog.noidung.forEach((nd, index) => {
        if (content[index]) {
          const updatedContent = replaceKeywordsWithLinks(
            content[index],
            keywords[index],
            urlBase[index]
          )
          nd.content = updatedContent
        }
        nd.keywords = keywords[index]
        nd.urlBase = urlBase[index]
        nd.img = img[index]
        nd.tieude = tieude[index]
      })

      for (let i = blog.noidung.length; i < content.length; i++) {
        const updatedContent = replaceKeywordsWithLinks(
          content[i],
          keywords[i],
          urlBase[i]
        )

        blog.noidung.push({
          content: updatedContent,
          img: img[i],
          tieude: tieude[i],
          keywords: keywords[i],
          urlBase: urlBase[i]
        })
      }
    } else {
      const updatedContent = replaceKeywordsWithLinks(
        content,
        keywords,
        urlBase
      )
      blog.noidung = blog.noidung.slice(0, content.length)

      blog.noidung = blog.noidung.map(nd => {
        nd.content = updatedContent
        nd.img = img
        nd.tieude = tieude
        nd.keywords = keywords
        nd.urlBase = urlBase
        return nd
      })
    }

    await blog.save()
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.get('/editblog/:idblog', async (req, res) => {
  try {
    const idblog = req.params.idblog
    const blogg = await myMDBlog.blogModel.findById(idblog)

    // Hàm để loại bỏ tất cả các thẻ <a> khỏi nội dung
    function removeAllLinks (content) {
      // Biểu thức chính quy để tìm và loại bỏ tất cả các thẻ <a> cùng với nội dung của chúng
      return content.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1')
    }

    const blog = blogg.noidung.map(bl => {
      return {
        content: removeAllLinks(bl.content),
        img: bl.img,
        tieude: bl.tieude,
        keywords: bl.keywords,
        urlBase: bl.urlBase
      }
    })

    res.render('home/editBlog.ejs', {
      idblog,
      blog,
      tieude_blog: blogg.tieude_blog,
      tieude_khongdau: blogg.tieude_khongdau,
      img_blog: blogg.img_blog
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})

router.post(
  '/editblog/:idblog',
  uploads.fields([
    { name: 'imgblog', maxCount: 1 }, // Một ảnh duy nhất
    { name: 'img', maxCount: 100000 } // Nhiều ảnh (có thể điều chỉnh số lượng tối đa)
  ]),
  async (req, res) => {
    try {
      const {
        tieude_blog,
        tieude,
        content,
        keywords,
        urlBase,
        tieude_khongdau
      } = req.body
      const idblog = req.params.idblog
      const blog = await myMDBlog.blogModel.findById(idblog)
      const imgblog =
        req.files && req.files['imgblog']
          ? `${domain}/${req.files['imgblog'][0].filename}`
          : blog.img_blog
      const img =
        req.files && req.files['img']
          ? req.files['img'].map(file => `${domain}/${file.filename}`)
          : blog.noidung.map(nd => nd.img).flat()

      blog.tieude_blog = tieude_blog
      blog.img_blog = imgblog
      blog.tieude_khongdau = tieude_khongdau

      if (
        Array.isArray(content) &&
        Array.isArray(img) &&
        Array.isArray(tieude)
      ) {
        blog.noidung.forEach((nd, index) => {
          if (content[index]) {
            const updatedContent = replaceKeywordsWithLinks(
              content[index],
              keywords[index],
              urlBase[index]
            )
            nd.content = updatedContent
          }
          nd.keywords = keywords[index]
          nd.urlBase = urlBase[index]
          nd.img = img[index]
          if (tieude[index]) {
            nd.tieude = tieude[index]
          }
        })

        for (let i = blog.noidung.length; i < content.length; i++) {
          const updatedContent = replaceKeywordsWithLinks(
            content[i],
            keywords[i],
            urlBase[i]
          )

          blog.noidung.push({
            content: updatedContent,
            img: img[i],
            tieude: tieude[i],
            keywords: keywords[i],
            urlBase: urlBase[i]
          })
        }
      } else {
        const updatedContent = replaceKeywordsWithLinks(
          content,
          keywords,
          urlBase
        )
        blog.noidung = blog.noidung.slice(0, content.length)

        blog.noidung = blog.noidung.map(nd => {
          nd.content = updatedContent
          nd.img = img
          nd.tieude = tieude
          nd.keywords = keywords
          nd.urlBase = urlBase
          return nd
        })
      }

      await blog.save()
      res.redirect('/main')
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
    }
  }
)

router.post('/upload', uploads.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  const fileUrl = `http://localhost:3000/${req.file.filename}`
  res.json({ url: fileUrl })
})

router.post('/deleteblog/:idblog', async (req, res) => {
  try {
    const idblog = req.params.idblog
    const blog = await myMDBlog.blogModel.findByIdAndDelete(idblog)
    res.redirect('/main')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Đã xảy ra lỗi: ${error}` })
  }
})
module.exports = router
