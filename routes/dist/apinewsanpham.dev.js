"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var uploads = require('./upload');

var Sp = require('../models/chitietSpModel');

var LoaiSP = require('../models/tenSpModel');

var multer = require('multer');

var myMDBlog = require('../models/blog.model');

var checkAuth = require('../controllers/checkAuth');

var LinkKien = require('../models/LinkKienModel');

var LoaiLinkKien = require('../models/LoaiLinhKien');

var Notify = require('../models/NotifyModel');

var DanhGia = require('../models/DanhGiaModel');

var moment = require('moment');

var momenttimezone = require('moment-timezone');

var unicode = require('unidecode');

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
});
router.get('/mess', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('home/test.ejs');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/postloaisp', function _callee2(req, res) {
  var _req$body, name, manhinh, chip, ram, dungluong, camera, pinsac, hang, congsac, thongtin, tensp;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, name = _req$body.name, manhinh = _req$body.manhinh, chip = _req$body.chip, ram = _req$body.ram, dungluong = _req$body.dungluong, camera = _req$body.camera, pinsac = _req$body.pinsac, hang = _req$body.hang, congsac = _req$body.congsac, thongtin = _req$body.thongtin;
          tensp = new LoaiSP.TenSP({
            name: name,
            manhinh: manhinh,
            chip: chip,
            ram: ram,
            dungluong: dungluong,
            camera: camera,
            pinsac: pinsac,
            hang: hang,
            congsac: congsac,
            thongtin: thongtin
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(tensp.save());

        case 5:
          res.redirect('/main');
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context2.t0)
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get('/gift', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render('home/gift.ejs');

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/putloaisp/:id', function _callee4(req, res) {
  var id, _req$body2, name, manhinh, chip, ram, dungluong, camera, pinsac, hang, congsac, thongtin;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, manhinh = _req$body2.manhinh, chip = _req$body2.chip, ram = _req$body2.ram, dungluong = _req$body2.dungluong, camera = _req$body2.camera, pinsac = _req$body2.pinsac, hang = _req$body2.hang, congsac = _req$body2.congsac, thongtin = _req$body2.thongtin;
          _context4.next = 5;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findByIdAndUpdate(id, {
            name: name,
            manhinh: manhinh,
            chip: chip,
            ram: ram,
            dungluong: dungluong,
            camera: camera,
            pinsac: pinsac,
            hang: hang,
            congsac: congsac,
            thongtin: thongtin
          }));

        case 5:
          res.redirect('/main');
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context4.t0)
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get('/editloaisp/:id', function _callee5(req, res) {
  var id, tensp;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(id));

        case 4:
          tensp = _context5.sent;
          res.render('home/editloaisp.ejs', {
            tensp: tensp
          });
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context5.t0)
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get('/addloaisp', function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          try {
            res.render('home/addloaisp.ejs');
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(error)
            });
          }

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.get('/addsp/:idloaisp', function _callee7(req, res) {
  var idloaisp;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          try {
            idloaisp = req.params.idloaisp;
            res.render('home/add.ejs', {
              idloaisp: idloaisp
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(error)
            });
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
router.get('/main', checkAuth, function _callee8(req, res) {
  var listloai, listblog, loailinhkien;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.find());

        case 3:
          listloai = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.find());

        case 6:
          listblog = _context8.sent;
          _context8.next = 9;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.find());

        case 9:
          loailinhkien = _context8.sent;
          res.render('home/home.ejs', {
            listloai: listloai,
            listblog: listblog,
            loailinhkien: loailinhkien
          });
          _context8.next = 16;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          console.log("l\u1ED7i: ".concat(_context8.t0));

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get('/', function _callee9(req, res) {
  var allsp, listBl, danhgia, tenspjson, danhgiaIsReadTrue;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.find().populate('chitietsp').lean());

        case 3:
          allsp = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.find().sort({
            _id: -1
          }).lean());

        case 6:
          listBl = _context9.sent;
          _context9.next = 9;
          return regeneratorRuntime.awrap(DanhGia.danhgia.find().lean());

        case 9:
          danhgia = _context9.sent;
          // Chuyển đổi dữ liệu sản phẩm
          tenspjson = allsp.map(function (tensp) {
            return {
              id: tensp._id,
              name: tensp.name,
              chitietsp: tensp.chitietsp.map(function (chitietsp) {
                return {
                  id: chitietsp._id,
                  name: chitietsp.name,
                  noidung: chitietsp.content,
                  price: chitietsp.price,
                  image: chitietsp.image
                };
              })
            };
          }); // Lọc và chuyển đổi đánh giá

          danhgiaIsReadTrue = danhgia.filter(function (d) {
            return d.isRead === true;
          }).map(function (d) {
            return {
              _id: d._id,
              tenkhach: d.tenkhach,
              content: d.content,
              rating: d.rating
            };
          }); // Render trang

          res.render('home/index.ejs', {
            tenspjson: tenspjson,
            listBl: listBl,
            danhgiaIsReadTrue: danhgiaIsReadTrue
          });
          _context9.next = 19;
          break;

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context9.t0.message)
          });

        case 19:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
router.post('/deleteloaisp/:id', function _callee11(req, res) {
  var id, xam;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          id = req.params.id;
          _context11.next = 4;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(id));

        case 4:
          xam = _context11.sent;

          if (!xam) {
            res.status(403).json({
              message: 'khong tim thay sp'
            });
          }

          _context11.next = 8;
          return regeneratorRuntime.awrap(Promise.all(xam.chitietsp.map(function _callee10(chitietsp) {
            return regeneratorRuntime.async(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return regeneratorRuntime.awrap(Sp.ChitietSp.findByIdAndDelete(chitietsp._id));

                  case 2:
                  case "end":
                    return _context10.stop();
                }
              }
            });
          })));

        case 8:
          _context11.next = 10;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.deleteOne({
            _id: id
          }));

        case 10:
          res.redirect('/main');
          _context11.next = 17;
          break;

        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context11.t0)
          });

        case 17:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.post('/postchitietsp/:id', upload.single('image'), function _callee12(req, res) {
  var id, _req$body3, name, content, price, image, chitietsp, tensp;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          id = req.params.id;
          _req$body3 = req.body, name = _req$body3.name, content = _req$body3.content, price = _req$body3.price;
          image = req.file.buffer.toString('base64');
          chitietsp = new Sp.ChitietSp({
            image: image,
            name: name,
            content: content,
            price: price
          });
          _context12.next = 7;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(id));

        case 7:
          tensp = _context12.sent;

          if (!tensp) {
            res.status(403).json({
              message: 'khong tim thay tensp'
            });
          }

          chitietsp.idloaisp = id;
          chitietsp.loaisp = tensp.name;
          tensp.chitietsp.push(chitietsp._id);
          _context12.next = 14;
          return regeneratorRuntime.awrap(chitietsp.save());

        case 14:
          _context12.next = 16;
          return regeneratorRuntime.awrap(tensp.save());

        case 16:
          res.redirect('/main');
          _context12.next = 23;
          break;

        case 19:
          _context12.prev = 19;
          _context12.t0 = _context12["catch"](0);
          console.error(_context12.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context12.t0)
          });

        case 23:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 19]]);
});
router.get('/getchitietsp/:idloaisp', function _callee14(req, res) {
  var idloaisp, loaisp, chitiet;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          idloaisp = req.params.idloaisp;
          _context14.next = 4;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(idloaisp));

        case 4:
          loaisp = _context14.sent;

          if (loaisp) {
            _context14.next = 7;
            break;
          }

          return _context14.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy loại sản phẩm'
          }));

        case 7:
          _context14.next = 9;
          return regeneratorRuntime.awrap(Promise.all(loaisp.chitietsp.map(function _callee13(ct) {
            var chitietsp;
            return regeneratorRuntime.async(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return regeneratorRuntime.awrap(Sp.ChitietSp.findById(ct._id));

                  case 2:
                    chitietsp = _context13.sent;
                    return _context13.abrupt("return", {
                      _id: chitietsp._id,
                      image: chitietsp.image,
                      name: chitietsp.name,
                      content: chitietsp.content,
                      price: chitietsp.price
                    });

                  case 4:
                  case "end":
                    return _context13.stop();
                }
              }
            });
          })));

        case 9:
          chitiet = _context14.sent;
          res.render('home/chitietsp.ejs', {
            chitiet: chitiet,
            idloaisp: idloaisp
          });
          _context14.next = 17;
          break;

        case 13:
          _context14.prev = 13;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context14.t0)
          });

        case 17:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get('/getspchitiet/:nameloaisp', function _callee16(req, res) {
  var nameloaisp, loaisp, chitiet;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          nameloaisp = req.params.nameloaisp.replace(/-/g, ' ');
          _context16.next = 4;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findOne({
            name: nameloaisp
          }));

        case 4:
          loaisp = _context16.sent;

          if (loaisp) {
            _context16.next = 7;
            break;
          }

          return _context16.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy loại sản phẩm'
          }));

        case 7:
          _context16.next = 9;
          return regeneratorRuntime.awrap(Promise.all(loaisp.chitietsp.map(function _callee15(ct) {
            var chitietsp;
            return regeneratorRuntime.async(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return regeneratorRuntime.awrap(Sp.ChitietSp.findById(ct._id));

                  case 2:
                    chitietsp = _context15.sent;
                    return _context15.abrupt("return", {
                      _id: chitietsp._id,
                      image: chitietsp.image,
                      name: chitietsp.name,
                      content: chitietsp.content,
                      price: chitietsp.price
                    });

                  case 4:
                  case "end":
                    return _context15.stop();
                }
              }
            });
          })));

        case 9:
          chitiet = _context16.sent;
          res.render('home/shop.ejs', {
            chitiet: chitiet,
            nameloaisp: nameloaisp
          });
          _context16.next = 17;
          break;

        case 13:
          _context16.prev = 13;
          _context16.t0 = _context16["catch"](0);
          console.error(_context16.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context16.t0)
          });

        case 17:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get('/getchitiet/:namesp/:nameloai', function _callee18(req, res) {
  var namesp, nameloai, sp, loai, spjson, mangloai, mangjson;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          namesp = req.params.namesp.replace(/-/g, ' ').replace(/pt/g, '%');
          nameloai = req.params.nameloai.replace(/-/g, ' ').replace(/pt/g, '%');
          _context18.next = 5;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findOne({
            name: namesp
          }));

        case 5:
          sp = _context18.sent;

          if (sp) {
            _context18.next = 8;
            break;
          }

          return _context18.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy sản phẩm'
          }));

        case 8:
          _context18.next = 10;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findOne({
            name: nameloai
          }));

        case 10:
          loai = _context18.sent;

          if (loai) {
            _context18.next = 13;
            break;
          }

          return _context18.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy loại sản phẩm'
          }));

        case 13:
          spjson = {
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
          };
          _context18.next = 16;
          return regeneratorRuntime.awrap(Promise.all(sp.chitiet.map(function _callee17(mang) {
            return regeneratorRuntime.async(function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    return _context17.abrupt("return", {
                      name: mang.name,
                      price: mang.price
                    });

                  case 1:
                  case "end":
                    return _context17.stop();
                }
              }
            });
          })));

        case 16:
          mangloai = _context18.sent;
          mangjson = {
            spjson: spjson,
            mangloai: mangloai
          }; // res.json(namesp)
          // // res.json(mangjson)

          res.render('home/single-product.ejs', {
            mangjson: mangjson,
            nameloai: nameloai,
            namesp: namesp
          });
          _context18.next = 25;
          break;

        case 21:
          _context18.prev = 21;
          _context18.t0 = _context18["catch"](0);
          console.error(_context18.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context18.t0)
          });

        case 25:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 21]]);
});
router.post('/postloaichitiet/:chitietspid', function _callee19(req, res) {
  var chitietspid, _req$body4, name, price, chitietsp;

  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          chitietspid = req.params.chitietspid;
          _req$body4 = req.body, name = _req$body4.name, price = _req$body4.price;
          _context19.next = 5;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(chitietspid));

        case 5:
          chitietsp = _context19.sent;
          chitietsp.chitiet.push({
            name: name,
            price: price
          });
          _context19.next = 9;
          return regeneratorRuntime.awrap(chitietsp.save());

        case 9:
          res.redirect("/getloaichitiet/".concat(chitietspid));
          _context19.next = 16;
          break;

        case 12:
          _context19.prev = 12;
          _context19.t0 = _context19["catch"](0);
          console.error(_context19.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context19.t0)
          });

        case 16:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.post('/editloaichitiet/:chitietspid/:id', function _callee20(req, res) {
  var chitietspid, _req$body5, name, price, chitietsp, id, index;

  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          chitietspid = req.params.chitietspid;
          _req$body5 = req.body, name = _req$body5.name, price = _req$body5.price;
          _context20.next = 5;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(chitietspid));

        case 5:
          chitietsp = _context20.sent;
          id = req.params.id;
          index = chitietsp.chitiet.findIndex(function (item) {
            return item._id.toString() === id;
          });

          if (!(index !== -1)) {
            _context20.next = 13;
            break;
          }

          chitietsp.chitiet[index].name = name;
          chitietsp.chitiet[index].price = price;
          _context20.next = 14;
          break;

        case 13:
          return _context20.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy id trong danh sách chitiet'
          }));

        case 14:
          _context20.next = 16;
          return regeneratorRuntime.awrap(chitietsp.save());

        case 16:
          res.redirect("/getloaichitiet/".concat(chitietspid));
          _context20.next = 23;
          break;

        case 19:
          _context20.prev = 19;
          _context20.t0 = _context20["catch"](0);
          console.error(_context20.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context20.t0)
          });

        case 23:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 19]]);
});
router.get('/geteditloaichitiet/:chitietspid/:id', function _callee21(req, res) {
  var chitietspid, id, chitietsp, index, json;
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          chitietspid = req.params.chitietspid;
          id = req.params.id;
          _context21.next = 5;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(chitietspid));

        case 5:
          chitietsp = _context21.sent;
          index = chitietsp.chitiet.findIndex(function (item) {
            return item._id.toString() === id;
          });
          json = {
            name: chitietsp.chitiet[index].name,
            price: chitietsp.chitiet[index].price
          };
          res.render('home/editloaichitiet.ejs', {
            chitietspid: chitietspid,
            id: id,
            json: json
          });
          _context21.next = 15;
          break;

        case 11:
          _context21.prev = 11;
          _context21.t0 = _context21["catch"](0);
          console.error(_context21.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context21.t0)
          });

        case 15:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.post('/deleteloaichitiet/:chitietspid/:id', function _callee22(req, res) {
  var chitietspid, id, chitietsp, updatedChitiet;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          chitietspid = req.params.chitietspid;
          id = req.params.id;
          _context22.next = 5;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(chitietspid));

        case 5:
          chitietsp = _context22.sent;
          updatedChitiet = chitietsp.chitiet.filter(function (item) {
            return item._id != id;
          });
          chitietsp.chitiet = updatedChitiet;
          _context22.next = 10;
          return regeneratorRuntime.awrap(chitietsp.save());

        case 10:
          res.redirect("/getloaichitiet/".concat(chitietspid));
          _context22.next = 17;
          break;

        case 13:
          _context22.prev = 13;
          _context22.t0 = _context22["catch"](0);
          console.error(_context22.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context22.t0)
          });

        case 17:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get('/getaddloaichitiet/:chitietspid', function _callee23(req, res) {
  var chitietspid;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          try {
            chitietspid = req.params.chitietspid;
            res.render('home/addloaichitiet.ejs', {
              chitietspid: chitietspid
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(error)
            });
          }

        case 1:
        case "end":
          return _context23.stop();
      }
    }
  });
});
router.get('/getloaichitiet/:idsp', function _callee25(req, res) {
  var idsp, sp, mangloai;
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          idsp = req.params.idsp;
          _context25.next = 4;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(idsp));

        case 4:
          sp = _context25.sent;

          if (sp) {
            _context25.next = 7;
            break;
          }

          return _context25.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy sản phẩm'
          }));

        case 7:
          _context25.next = 9;
          return regeneratorRuntime.awrap(Promise.all(sp.chitiet.map(function _callee24(mang) {
            return regeneratorRuntime.async(function _callee24$(_context24) {
              while (1) {
                switch (_context24.prev = _context24.next) {
                  case 0:
                    return _context24.abrupt("return", {
                      _id: mang._id,
                      name: mang.name,
                      price: mang.price
                    });

                  case 1:
                  case "end":
                    return _context24.stop();
                }
              }
            });
          })));

        case 9:
          mangloai = _context25.sent;
          // res.json(mangjson)
          res.render('home/loaichitietsp.ejs', {
            mangloai: mangloai,
            idsp: idsp
          });
          _context25.next = 17;
          break;

        case 13:
          _context25.prev = 13;
          _context25.t0 = _context25["catch"](0);
          console.error(_context25.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context25.t0)
          });

        case 17:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.post('/deletechitietsp/:id', function _callee26(req, res) {
  var id, chitietsp, loaisp;
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          id = req.params.id;
          _context26.next = 4;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(id));

        case 4:
          chitietsp = _context26.sent;

          if (chitietsp) {
            _context26.next = 7;
            break;
          }

          return _context26.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy chi tiết sản phẩm'
          }));

        case 7:
          _context26.next = 9;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(chitietsp.idloaisp));

        case 9:
          loaisp = _context26.sent;
          loaisp.chitietsp = loaisp.chitietsp.filter(function (chitiet) {
            return chitiet.toString() !== id;
          });
          _context26.next = 13;
          return regeneratorRuntime.awrap(loaisp.save());

        case 13:
          _context26.next = 15;
          return regeneratorRuntime.awrap(Sp.ChitietSp.deleteOne({
            _id: id
          }));

        case 15:
          res.redirect('/main');
          _context26.next = 22;
          break;

        case 18:
          _context26.prev = 18;
          _context26.t0 = _context26["catch"](0);
          console.error(_context26.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context26.t0)
          });

        case 22:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
router.post('/updatechitietsp/:id', function _callee27(req, res) {
  var id, _req$body6, name, content, price, chitietsp;

  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          id = req.params.id;
          _req$body6 = req.body, name = _req$body6.name, content = _req$body6.content, price = _req$body6.price;
          _context27.next = 5;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(id));

        case 5:
          chitietsp = _context27.sent;

          if (chitietsp) {
            _context27.next = 8;
            break;
          }

          return _context27.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy chi tiết sản phẩm'
          }));

        case 8:
          chitietsp.content = content;
          chitietsp.price = price;
          chitietsp.name = name;
          _context27.next = 13;
          return regeneratorRuntime.awrap(chitietsp.save());

        case 13:
          res.redirect('/main');
          _context27.next = 20;
          break;

        case 16:
          _context27.prev = 16;
          _context27.t0 = _context27["catch"](0);
          console.error(_context27.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context27.t0)
          });

        case 20:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.get('/editsp/:id', function _callee28(req, res) {
  var id, sp;
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          id = req.params.id;
          _context28.next = 4;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(id));

        case 4:
          sp = _context28.sent;
          res.render('home/edit.ejs', {
            sp: sp
          });
          _context28.next = 12;
          break;

        case 8:
          _context28.prev = 8;
          _context28.t0 = _context28["catch"](0);
          console.error(_context28.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context28.t0)
          });

        case 12:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get('/suachua', function _callee31(req, res) {
  var loailinhkien, loailinhkienjson;
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.find().populate('linhkien'));

        case 3:
          loailinhkien = _context31.sent;
          _context31.next = 6;
          return regeneratorRuntime.awrap(Promise.all(loailinhkien.map(function _callee30(loai) {
            var linkkienJson;
            return regeneratorRuntime.async(function _callee30$(_context30) {
              while (1) {
                switch (_context30.prev = _context30.next) {
                  case 0:
                    _context30.next = 2;
                    return regeneratorRuntime.awrap(Promise.all(loai.linhkien.map(function _callee29(lk) {
                      return regeneratorRuntime.async(function _callee29$(_context29) {
                        while (1) {
                          switch (_context29.prev = _context29.next) {
                            case 0:
                              return _context29.abrupt("return", {
                                id: lk._id,
                                name: lk.name,
                                price: lk.price,
                                image: lk.image
                              });

                            case 1:
                            case "end":
                              return _context29.stop();
                          }
                        }
                      });
                    })));

                  case 2:
                    linkkienJson = _context30.sent;
                    return _context30.abrupt("return", {
                      id: loai._id,
                      name: loai.name,
                      linkkienJson: linkkienJson
                    });

                  case 4:
                  case "end":
                    return _context30.stop();
                }
              }
            });
          })));

        case 6:
          loailinhkienjson = _context31.sent;
          // res.json(loailinhkienjson)
          res.render('home/linkkien.ejs', {
            loailinhkienjson: loailinhkienjson
          });
          _context31.next = 14;
          break;

        case 10:
          _context31.prev = 10;
          _context31.t0 = _context31["catch"](0);
          console.error(_context31.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context31.t0)
          });

        case 14:
        case "end":
          return _context31.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.post('/postlinkkien/:idloailinkkien', upload.single('image'), function _callee32(req, res) {
  var _req$body7, name, price, idloailinkkien, loailinhkien, image, linkkien;

  return regeneratorRuntime.async(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          _req$body7 = req.body, name = _req$body7.name, price = _req$body7.price;
          idloailinkkien = req.params.idloailinkkien;
          _context32.next = 5;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.findById(idloailinkkien));

        case 5:
          loailinhkien = _context32.sent;
          image = req.file.buffer.toString('base64');
          linkkien = new LinkKien.linkkien({
            name: name,
            price: price,
            image: image
          });
          linkkien.loailinhkien = loailinhkien._id;
          linkkien.loai = loailinhkien.name;
          loailinhkien.linhkien.push(linkkien._id);
          _context32.next = 13;
          return regeneratorRuntime.awrap(linkkien.save());

        case 13:
          _context32.next = 15;
          return regeneratorRuntime.awrap(loailinhkien.save());

        case 15:
          res.redirect("/linhkien/".concat(idloailinkkien));
          _context32.next = 22;
          break;

        case 18:
          _context32.prev = 18;
          _context32.t0 = _context32["catch"](0);
          console.error(_context32.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context32.t0)
          });

        case 22:
        case "end":
          return _context32.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
router.get('/addlinhkien/:id', function _callee33(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee33$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          try {
            id = req.params.id;
            res.render('home/addlinhkien.ejs', {
              id: id
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(error)
            });
          }

        case 1:
        case "end":
          return _context33.stop();
      }
    }
  });
});
router.get('/editlinhkien/:id', function _callee34(req, res) {
  var id, linhkien;
  return regeneratorRuntime.async(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          id = req.params.id;
          _context34.next = 4;
          return regeneratorRuntime.awrap(LinkKien.linkkien.findById(id));

        case 4:
          linhkien = _context34.sent;
          res.render('home/editlinhkien.ejs', {
            linhkien: linhkien,
            id: id
          });
          _context34.next = 12;
          break;

        case 8:
          _context34.prev = 8;
          _context34.t0 = _context34["catch"](0);
          console.error(_context34.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context34.t0)
          });

        case 12:
        case "end":
          return _context34.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/putlinhkien/:id', function _callee35(req, res) {
  var id, _req$body8, name, price, linhkien;

  return regeneratorRuntime.async(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          id = req.params.id;
          _req$body8 = req.body, name = _req$body8.name, price = _req$body8.price;
          _context35.next = 5;
          return regeneratorRuntime.awrap(LinkKien.linkkien.findById(id));

        case 5:
          linhkien = _context35.sent;
          linhkien.name = name;
          linhkien.price = price;
          _context35.next = 10;
          return regeneratorRuntime.awrap(linhkien.save());

        case 10:
          res.redirect("/linhkien/".concat(linhkien.loailinhkien));
          _context35.next = 17;
          break;

        case 13:
          _context35.prev = 13;
          _context35.t0 = _context35["catch"](0);
          console.error(_context35.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context35.t0)
          });

        case 17:
        case "end":
          return _context35.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.post('/deletelk/:id', function _callee36(req, res) {
  var id, linhkien, loailinhkien;
  return regeneratorRuntime.async(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          id = req.params.id;
          _context36.next = 4;
          return regeneratorRuntime.awrap(LinkKien.linkkien.findById(id));

        case 4:
          linhkien = _context36.sent;
          _context36.next = 7;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.findById(linhkien.loailinhkien));

        case 7:
          loailinhkien = _context36.sent;
          loailinhkien.linhkien = loailinhkien.linhkien.filter(function (chitiet) {
            return chitiet.toString() !== id;
          });
          _context36.next = 11;
          return regeneratorRuntime.awrap(loailinhkien.save());

        case 11:
          _context36.next = 13;
          return regeneratorRuntime.awrap(LinkKien.linkkien.deleteOne({
            _id: id
          }));

        case 13:
          res.redirect("/linhkien/".concat(linhkien.loailinhkien));
          _context36.next = 20;
          break;

        case 16:
          _context36.prev = 16;
          _context36.t0 = _context36["catch"](0);
          console.error(_context36.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context36.t0)
          });

        case 20:
        case "end":
          return _context36.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.post('/postloailinkien', function _callee37(req, res) {
  var name, loailinkkien;
  return regeneratorRuntime.async(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          name = req.body.name;
          loailinkkien = new LoaiLinkKien.loailinkkien({
            name: name
          });
          _context37.next = 5;
          return regeneratorRuntime.awrap(loailinkkien.save());

        case 5:
          res.redirect('/main');
          _context37.next = 12;
          break;

        case 8:
          _context37.prev = 8;
          _context37.t0 = _context37["catch"](0);
          console.error(_context37.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context37.t0)
          });

        case 12:
        case "end":
          return _context37.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/putloailk/:id', function _callee38(req, res) {
  var id, name, loailinhkien;
  return regeneratorRuntime.async(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.prev = 0;
          id = req.params.id;
          name = req.body.name;
          _context38.next = 5;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.findById(id));

        case 5:
          loailinhkien = _context38.sent;
          loailinhkien.name = name;
          _context38.next = 9;
          return regeneratorRuntime.awrap(loailinhkien.save());

        case 9:
          res.redirect('/main');
          _context38.next = 16;
          break;

        case 12:
          _context38.prev = 12;
          _context38.t0 = _context38["catch"](0);
          console.error(_context38.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context38.t0)
          });

        case 16:
        case "end":
          return _context38.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.post('/deleteloailk/:id', function _callee40(req, res) {
  var id, loailinhkien;
  return regeneratorRuntime.async(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.prev = 0;
          id = req.params.id;
          _context40.next = 4;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.findById(id));

        case 4:
          loailinhkien = _context40.sent;
          Promise.all(loailinhkien.linhkien.map(function _callee39(linhkien) {
            return regeneratorRuntime.async(function _callee39$(_context39) {
              while (1) {
                switch (_context39.prev = _context39.next) {
                  case 0:
                    _context39.next = 2;
                    return regeneratorRuntime.awrap(LinkKien.linkkien.findByIdAndDelete(linhkien._id));

                  case 2:
                  case "end":
                    return _context39.stop();
                }
              }
            });
          }));
          _context40.next = 8;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.deleteOne({
            _id: id
          }));

        case 8:
          res.redirect('/main');
          _context40.next = 15;
          break;

        case 11:
          _context40.prev = 11;
          _context40.t0 = _context40["catch"](0);
          console.error(_context40.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context40.t0)
          });

        case 15:
        case "end":
          return _context40.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/addloailk', function _callee41(req, res) {
  return regeneratorRuntime.async(function _callee41$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          try {
            res.render('home/addloailinhkien.ejs');
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(error)
            });
          }

        case 1:
        case "end":
          return _context41.stop();
      }
    }
  });
});
router.get('/editloailk/:id', function _callee42(req, res) {
  var id, loailinhkien;
  return regeneratorRuntime.async(function _callee42$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          _context42.prev = 0;
          id = req.params.id;
          _context42.next = 4;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.findById(id));

        case 4:
          loailinhkien = _context42.sent;
          res.render('home/editloailinhkien.ejs', {
            id: id,
            loailinhkien: loailinhkien
          });
          _context42.next = 12;
          break;

        case 8:
          _context42.prev = 8;
          _context42.t0 = _context42["catch"](0);
          console.error(_context42.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context42.t0)
          });

        case 12:
        case "end":
          return _context42.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get('/linhkien/:id', function _callee44(req, res) {
  var id, loailinhkien, linhkienjson;
  return regeneratorRuntime.async(function _callee44$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          _context44.prev = 0;
          id = req.params.id;
          _context44.next = 4;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.findById(id));

        case 4:
          loailinhkien = _context44.sent;
          _context44.next = 7;
          return regeneratorRuntime.awrap(Promise.all(loailinhkien.linhkien.map(function _callee43(lk) {
            var linhkien;
            return regeneratorRuntime.async(function _callee43$(_context43) {
              while (1) {
                switch (_context43.prev = _context43.next) {
                  case 0:
                    _context43.next = 2;
                    return regeneratorRuntime.awrap(LinkKien.linkkien.findById(lk._id));

                  case 2:
                    linhkien = _context43.sent;
                    return _context43.abrupt("return", {
                      _id: linhkien.id,
                      name: linhkien.name,
                      price: linhkien.price,
                      image: linhkien.image,
                      loai: linhkien.loai
                    });

                  case 4:
                  case "end":
                    return _context43.stop();
                }
              }
            });
          })));

        case 7:
          linhkienjson = _context44.sent;
          res.render('home/linhkienmain.ejs', {
            linhkienjson: linhkienjson,
            id: id
          });
          _context44.next = 15;
          break;

        case 11:
          _context44.prev = 11;
          _context44.t0 = _context44["catch"](0);
          console.error(_context44.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context44.t0)
          });

        case 15:
        case "end":
          return _context44.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/xemlinhkien/:id', function _callee46(req, res) {
  var id, loailinhkien, linhkienjson;
  return regeneratorRuntime.async(function _callee46$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          _context46.prev = 0;
          id = req.params.id;
          _context46.next = 4;
          return regeneratorRuntime.awrap(LoaiLinkKien.loailinkkien.findById(id));

        case 4:
          loailinhkien = _context46.sent;
          _context46.next = 7;
          return regeneratorRuntime.awrap(Promise.all(loailinhkien.linhkien.map(function _callee45(lk) {
            var linhkien;
            return regeneratorRuntime.async(function _callee45$(_context45) {
              while (1) {
                switch (_context45.prev = _context45.next) {
                  case 0:
                    _context45.next = 2;
                    return regeneratorRuntime.awrap(LinkKien.linkkien.findById(lk._id));

                  case 2:
                    linhkien = _context45.sent;
                    return _context45.abrupt("return", {
                      _id: linhkien.id,
                      name: linhkien.name,
                      price: linhkien.price,
                      image: linhkien.image,
                      loai: linhkien.loai
                    });

                  case 4:
                  case "end":
                    return _context45.stop();
                }
              }
            });
          })));

        case 7:
          linhkienjson = _context46.sent;
          res.render('home/xemlinhkien.ejs', {
            linhkienjson: linhkienjson,
            id: id
          });
          _context46.next = 15;
          break;

        case 11:
          _context46.prev = 11;
          _context46.t0 = _context46["catch"](0);
          console.error(_context46.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context46.t0)
          });

        case 15:
        case "end":
          return _context46.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/muangay/:idsp', function _callee47(req, res) {
  var idsp, sp, spjson;
  return regeneratorRuntime.async(function _callee47$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          _context47.prev = 0;
          idsp = req.params.idsp;
          _context47.next = 4;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findById(idsp));

        case 4:
          sp = _context47.sent;
          spjson = {
            name: sp.name,
            price: sp.price
          }; // res.json(spjson)

          res.render('home/formmua.ejs', {
            spjson: spjson
          });
          _context47.next = 13;
          break;

        case 9:
          _context47.prev = 9;
          _context47.t0 = _context47["catch"](0);
          console.error(_context47.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context47.t0)
          });

        case 13:
        case "end":
          return _context47.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post('/postnotify', function _callee48(req, res) {
  var _req$body9, tenkhach, phone, email, tensp, price, address, vietnamTime, notify, sp;

  return regeneratorRuntime.async(function _callee48$(_context48) {
    while (1) {
      switch (_context48.prev = _context48.next) {
        case 0:
          _context48.prev = 0;
          _req$body9 = req.body, tenkhach = _req$body9.tenkhach, phone = _req$body9.phone, email = _req$body9.email, tensp = _req$body9.tensp, price = _req$body9.price, address = _req$body9.address;
          vietnamTime = momenttimezone().toDate();
          notify = new Notify.notify({
            tenkhach: tenkhach,
            phone: phone,
            email: email,
            tensp: tensp,
            price: price,
            address: address
          });
          _context48.next = 6;
          return regeneratorRuntime.awrap(Sp.ChitietSp.findOne({
            name: tensp
          }));

        case 6:
          sp = _context48.sent;
          notify.idsp = sp._id;
          notify.date = vietnamTime;
          _context48.next = 11;
          return regeneratorRuntime.awrap(notify.save());

        case 11:
          setTimeout(function () {
            res.redirect('/');
          }, 3000);
          _context48.next = 18;
          break;

        case 14:
          _context48.prev = 14;
          _context48.t0 = _context48["catch"](0);
          console.error(_context48.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context48.t0)
          });

        case 18:
        case "end":
          return _context48.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.post('/duyet/:idnotify', function _callee49(req, res) {
  var idnotify, notify;
  return regeneratorRuntime.async(function _callee49$(_context49) {
    while (1) {
      switch (_context49.prev = _context49.next) {
        case 0:
          _context49.prev = 0;
          idnotify = req.params.idnotify;
          _context49.next = 4;
          return regeneratorRuntime.awrap(Notify.notify.findById(idnotify));

        case 4:
          notify = _context49.sent;
          notify.isRead = true;
          _context49.next = 8;
          return regeneratorRuntime.awrap(notify.save());

        case 8:
          res.redirect('/donhang');
          _context49.next = 15;
          break;

        case 11:
          _context49.prev = 11;
          _context49.t0 = _context49["catch"](0);
          console.error(_context49.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context49.t0)
          });

        case 15:
        case "end":
          return _context49.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/donhang', function _callee50(req, res) {
  var donhang, donHangIsReadTrue, donHangIsReadFalse;
  return regeneratorRuntime.async(function _callee50$(_context50) {
    while (1) {
      switch (_context50.prev = _context50.next) {
        case 0:
          _context50.prev = 0;
          _context50.next = 3;
          return regeneratorRuntime.awrap(Notify.notify.find());

        case 3:
          donhang = _context50.sent;
          donHangIsReadTrue = donhang.filter(function (d) {
            return d.isRead === true;
          }).map(function (d) {
            return {
              _id: d._id,
              tenkhach: d.tenkhach,
              phone: d.phone,
              email: d.email,
              address: d.address,
              tensp: d.tensp,
              price: d.price,
              date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
            };
          });
          donHangIsReadFalse = donhang.filter(function (d) {
            return d.isRead === false;
          }).map(function (d) {
            return {
              _id: d._id,
              tenkhach: d.tenkhach,
              phone: d.phone,
              email: d.email,
              address: d.address,
              tensp: d.tensp,
              price: d.price,
              date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
            };
          });
          res.render('home/donhang.ejs', {
            donHangIsReadTrue: donHangIsReadTrue,
            donHangIsReadFalse: donHangIsReadFalse
          });
          _context50.next = 13;
          break;

        case 9:
          _context50.prev = 9;
          _context50.t0 = _context50["catch"](0);
          console.error(_context50.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context50.t0)
          });

        case 13:
        case "end":
          return _context50.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post('/danhgia', function _callee51(req, res) {
  var _req$body10, tenkhach, content, rating, vietnamTime, danhgia;

  return regeneratorRuntime.async(function _callee51$(_context51) {
    while (1) {
      switch (_context51.prev = _context51.next) {
        case 0:
          _context51.prev = 0;
          _req$body10 = req.body, tenkhach = _req$body10.tenkhach, content = _req$body10.content, rating = _req$body10.rating;
          vietnamTime = momenttimezone().toDate();
          danhgia = new DanhGia.danhgia({
            tenkhach: tenkhach,
            content: content,
            rating: rating,
            date: vietnamTime
          });
          _context51.next = 6;
          return regeneratorRuntime.awrap(danhgia.save());

        case 6:
          res.redirect('/');
          _context51.next = 13;
          break;

        case 9:
          _context51.prev = 9;
          _context51.t0 = _context51["catch"](0);
          console.error(_context51.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context51.t0)
          });

        case 13:
        case "end":
          return _context51.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.get('/getdanhgia', function _callee52(req, res) {
  var danhgia, danhgiaIsReadTrue, danhgiaIsReadFalse;
  return regeneratorRuntime.async(function _callee52$(_context52) {
    while (1) {
      switch (_context52.prev = _context52.next) {
        case 0:
          _context52.prev = 0;
          _context52.next = 3;
          return regeneratorRuntime.awrap(DanhGia.danhgia.find());

        case 3:
          danhgia = _context52.sent;
          danhgiaIsReadTrue = danhgia.filter(function (d) {
            return d.isRead === true;
          }).map(function (d) {
            return {
              _id: d._id,
              tenkhach: d.tenkhach,
              content: d.content,
              rating: d.rating,
              date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
            };
          });
          danhgiaIsReadFalse = danhgia.filter(function (d) {
            return d.isRead === false;
          }).map(function (d) {
            return {
              _id: d._id,
              tenkhach: d.tenkhach,
              content: d.content,
              rating: d.rating,
              date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
            };
          });
          res.render('home/danhgia.ejs', {
            danhgiaIsReadTrue: danhgiaIsReadTrue,
            danhgiaIsReadFalse: danhgiaIsReadFalse
          });
          _context52.next = 13;
          break;

        case 9:
          _context52.prev = 9;
          _context52.t0 = _context52["catch"](0);
          console.error(_context52.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context52.t0)
          });

        case 13:
        case "end":
          return _context52.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post('/duyetdanhgia/:iddanhgia', function _callee53(req, res) {
  var iddanhgia, danhgia;
  return regeneratorRuntime.async(function _callee53$(_context53) {
    while (1) {
      switch (_context53.prev = _context53.next) {
        case 0:
          _context53.prev = 0;
          iddanhgia = req.params.iddanhgia;
          _context53.next = 4;
          return regeneratorRuntime.awrap(DanhGia.danhgia.findById(iddanhgia));

        case 4:
          danhgia = _context53.sent;
          danhgia.isRead = true;
          _context53.next = 8;
          return regeneratorRuntime.awrap(danhgia.save());

        case 8:
          res.redirect('/getdanhgia');
          _context53.next = 15;
          break;

        case 11:
          _context53.prev = 11;
          _context53.t0 = _context53["catch"](0);
          console.error(_context53.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context53.t0)
          });

        case 15:
        case "end":
          return _context53.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/contentBlog/:tieude', function _callee54(req, res) {
  var tieude_khongdau, blog, allsp, listBl, content;
  return regeneratorRuntime.async(function _callee54$(_context54) {
    while (1) {
      switch (_context54.prev = _context54.next) {
        case 0:
          _context54.prev = 0;
          tieude_khongdau = decodeURIComponent(req.params.tieude).replace(/-/g, ' ');
          _context54.next = 4;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findOne({
            tieude_khongdau: tieude_khongdau
          }));

        case 4:
          blog = _context54.sent;
          _context54.next = 7;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.find().populate('chitietsp'));

        case 7:
          allsp = _context54.sent;

          if (blog) {
            _context54.next = 10;
            break;
          }

          return _context54.abrupt("return", res.status(404).json({
            message: 'Blog không tồn tại'
          }));

        case 10:
          _context54.next = 12;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.find().sort({
            _id: -1
          }));

        case 12:
          listBl = _context54.sent;
          content = blog.noidung.map(function (noidung) {
            return {
              tieude: noidung.tieude,
              content: noidung.content.replace(/\\n/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;'),
              img: noidung.img || ''
            };
          });
          res.render('home/chitietblog.ejs', {
            content: content,
            tieude: blog.tieude_blog,
            listBl: listBl,
            image_blog: blog.img_blog,
            allsp: allsp
          });
          _context54.next = 21;
          break;

        case 17:
          _context54.prev = 17;
          _context54.t0 = _context54["catch"](0);
          console.error(_context54.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context54.t0)
          });

        case 21:
        case "end":
          return _context54.stop();
      }
    }
  }, null, null, [[0, 17]]);
});

function escapeRegExp(string) {
  // Hàm thoát ký tự đặc biệt trong biểu thức chính quy
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function removeSpecialChars(str) {
  // Danh sách các ký tự đặc biệt bạn muốn xóa
  var specialChars = /[:+,!@#$%^&*()-?/]/g; // Thay đổi biểu thức chính quy theo các ký tự bạn muốn xóa
  // Xóa các ký tự đặc biệt

  return str.replace(specialChars, '');
}

function replaceKeywordsWithLinks(content, keywords, urlBase) {
  // Nếu keywords không phải là mảng, chuyển đổi nó thành mảng chứa một từ khóa duy nhất
  if (!Array.isArray(keywords)) {
    keywords = [keywords];
  } // Nếu không có từ khóa, trả lại nội dung gốc


  if (!keywords || keywords.length === 0) {
    return content;
  } // Thay thế từng từ khóa bằng thẻ <a>


  keywords.forEach(function (keyword) {
    if (keyword === '') {
      return;
    } // Thoát các ký tự đặc biệt trong từ khóa


    var escapedKeyword = escapeRegExp(keyword); // Tạo một biểu thức chính quy để tìm từ khóa

    var regex = new RegExp("\\b".concat(escapedKeyword, "\\b"), 'gi'); // Thay thế từ khóa bằng thẻ <a> với đường link

    content = content.replace(regex, "<a href=\"".concat(urlBase, "\">").concat(keyword, "</a>"));
  });
  return content;
}

router.post('/postblog', function _callee55(req, res) {
  var _req$body11, tieude_blog, img, content, tieude, img_blog, keywords, urlBase, tieude_khongdau1, tieude_khongdau, blog, i, updatedContent, _updatedContent;

  return regeneratorRuntime.async(function _callee55$(_context55) {
    while (1) {
      switch (_context55.prev = _context55.next) {
        case 0:
          _context55.prev = 0;
          _req$body11 = req.body, tieude_blog = _req$body11.tieude_blog, img = _req$body11.img, content = _req$body11.content, tieude = _req$body11.tieude, img_blog = _req$body11.img_blog, keywords = _req$body11.keywords, urlBase = _req$body11.urlBase;
          tieude_khongdau1 = unicode(tieude_blog);
          tieude_khongdau = removeSpecialChars(tieude_khongdau1);
          blog = new myMDBlog.blogModel({
            tieude_blog: tieude_blog,
            img_blog: img_blog,
            tieude_khongdau: tieude_khongdau
          }); // Thêm các nội dung blog

          if (Array.isArray(content) && Array.isArray(img) && Array.isArray(tieude)) {
            for (i = 0; i < content.length; i++) {
              updatedContent = replaceKeywordsWithLinks(content[i], keywords[i], urlBase[i]);
              blog.noidung.push({
                content: updatedContent,
                img: img[i],
                tieude: tieude[i],
                keywords: keywords[i],
                urlBase: urlBase[i]
              });
            }
          } else {
            _updatedContent = replaceKeywordsWithLinks(content, keywords, urlBase);
            blog.noidung.push(_defineProperty({
              content: _updatedContent,
              img: img,
              tieude: tieude,
              keywords: keywords
            }, "keywords", keywords));
          }

          _context55.next = 8;
          return regeneratorRuntime.awrap(blog.save());

        case 8:
          res.redirect('/main');
          _context55.next = 15;
          break;

        case 11:
          _context55.prev = 11;
          _context55.t0 = _context55["catch"](0);
          console.error(_context55.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context55.t0)
          });

        case 15:
        case "end":
          return _context55.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.post('/postblog2', uploads.fields([{
  name: 'imgblog',
  maxCount: 1
}, // Một ảnh duy nhất
{
  name: 'img',
  maxCount: 100000
} // Nhiều ảnh (có thể điều chỉnh số lượng tối đa)
]), function _callee56(req, res) {
  var _req$body12, tieude_blog, content, tieude, keywords, urlBase, _domain, imgblog, img, tieude_khongdau1, tieude_khongdau, blog, i, updatedContent, _updatedContent2;

  return regeneratorRuntime.async(function _callee56$(_context56) {
    while (1) {
      switch (_context56.prev = _context56.next) {
        case 0:
          _context56.prev = 0;
          _req$body12 = req.body, tieude_blog = _req$body12.tieude_blog, content = _req$body12.content, tieude = _req$body12.tieude, keywords = _req$body12.keywords, urlBase = _req$body12.urlBase; // Xác định domain

          _domain = 'https://www.baominhmobile.com'; // Thay đổi thành domain của bạn
          // Lấy tên file ảnh từ req.files và thêm domain vào trước tên file

          imgblog = req.files['imgblog'] ? "".concat(_domain, "/").concat(req.files['imgblog'][0].filename) : null;
          img = req.files['img'] ? req.files['img'].map(function (file) {
            return "".concat(_domain, "/").concat(file.filename);
          }) : [];
          tieude_khongdau1 = unicode(tieude_blog);
          tieude_khongdau = removeSpecialChars(tieude_khongdau1);
          blog = new myMDBlog.blogModel({
            tieude_blog: tieude_blog,
            img_blog: imgblog,
            // URL ảnh đơn
            tieude_khongdau: tieude_khongdau
          }); // Thêm các nội dung blog

          if (Array.isArray(content) && Array.isArray(tieude) && Array.isArray(keywords) && Array.isArray(urlBase)) {
            for (i = 0; i < content.length; i++) {
              updatedContent = replaceKeywordsWithLinks(content[i], keywords[i], urlBase[i]);
              blog.noidung.push({
                content: updatedContent,
                img: img[i] || null,
                // Sử dụng ảnh từ mảng hoặc null nếu không có
                tieude: tieude[i],
                keywords: keywords[i],
                urlBase: urlBase[i]
              });
            }
          } else {
            _updatedContent2 = replaceKeywordsWithLinks(content, keywords, urlBase);
            blog.noidung.push({
              content: _updatedContent2,
              img: img[0] || null,
              // Nếu chỉ có một ảnh, chọn ảnh đầu tiên hoặc null
              tieude: tieude,
              keywords: keywords,
              urlBase: urlBase
            });
          }

          _context56.next = 11;
          return regeneratorRuntime.awrap(blog.save());

        case 11:
          res.redirect('/main');
          _context56.next = 18;
          break;

        case 14:
          _context56.prev = 14;
          _context56.t0 = _context56["catch"](0);
          console.error(_context56.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context56.t0)
          });

        case 18:
        case "end":
          return _context56.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.get('/getaddblog', function _callee57(req, res) {
  return regeneratorRuntime.async(function _callee57$(_context57) {
    while (1) {
      switch (_context57.prev = _context57.next) {
        case 0:
          res.render('home/addblog.ejs');

        case 1:
        case "end":
          return _context57.stop();
      }
    }
  });
});
router.get('/getaddblogtest', function _callee58(req, res) {
  return regeneratorRuntime.async(function _callee58$(_context58) {
    while (1) {
      switch (_context58.prev = _context58.next) {
        case 0:
          res.render('home/test.ejs');

        case 1:
        case "end":
          return _context58.stop();
      }
    }
  });
});
router.get('/getblog', function _callee59(req, res) {
  var listBl;
  return regeneratorRuntime.async(function _callee59$(_context59) {
    while (1) {
      switch (_context59.prev = _context59.next) {
        case 0:
          _context59.prev = 0;
          _context59.next = 3;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.find().sort({
            _id: -1
          }));

        case 3:
          listBl = _context59.sent;
          res.render('home/blog.ejs', {
            listBl: listBl
          });
          _context59.next = 11;
          break;

        case 7:
          _context59.prev = 7;
          _context59.t0 = _context59["catch"](0);
          console.error(_context59.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context59.t0)
          });

        case 11:
        case "end":
          return _context59.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/editblog/:idblog', function _callee60(req, res) {
  var removeAllLinks, idblog, blogg, blog;
  return regeneratorRuntime.async(function _callee60$(_context60) {
    while (1) {
      switch (_context60.prev = _context60.next) {
        case 0:
          _context60.prev = 0;

          // Hàm để loại bỏ tất cả các thẻ <a> khỏi nội dung
          removeAllLinks = function removeAllLinks(content) {
            // Biểu thức chính quy để tìm và loại bỏ tất cả các thẻ <a> cùng với nội dung của chúng
            return content.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');
          };

          idblog = req.params.idblog;
          _context60.next = 5;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findById(idblog));

        case 5:
          blogg = _context60.sent;
          blog = blogg.noidung.map(function (bl) {
            return {
              content: removeAllLinks(bl.content),
              img: bl.img,
              tieude: bl.tieude,
              keywords: bl.keywords,
              urlBase: bl.urlBase
            };
          });
          res.render('home/editBlog.ejs', {
            idblog: idblog,
            blog: blog,
            tieude_blog: blogg.tieude_blog,
            tieude_khongdau: blogg.tieude_khongdau,
            img_blog: blogg.img_blog
          });
          _context60.next = 14;
          break;

        case 10:
          _context60.prev = 10;
          _context60.t0 = _context60["catch"](0);
          console.error(_context60.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context60.t0)
          });

        case 14:
        case "end":
          return _context60.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.post('/editblog/:idblog', uploads.fields([{
  name: 'imgblog',
  maxCount: 1
}, // Một ảnh duy nhất
{
  name: 'img',
  maxCount: 100000
} // Nhiều ảnh (có thể điều chỉnh số lượng tối đa)
]), function _callee61(req, res) {
  var _req$body13, tieude_blog, tieude, content, keywords, urlBase, tieude_khongdau, idblog, blog, imgblog, img, i, updatedContent, _updatedContent3;

  return regeneratorRuntime.async(function _callee61$(_context61) {
    while (1) {
      switch (_context61.prev = _context61.next) {
        case 0:
          _context61.prev = 0;
          _req$body13 = req.body, tieude_blog = _req$body13.tieude_blog, tieude = _req$body13.tieude, content = _req$body13.content, keywords = _req$body13.keywords, urlBase = _req$body13.urlBase, tieude_khongdau = _req$body13.tieude_khongdau;
          idblog = req.params.idblog;
          _context61.next = 5;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findById(idblog));

        case 5:
          blog = _context61.sent;
          imgblog = req.files && req.files['imgblog'] ? "".concat(domain, "/").concat(req.files['imgblog'][0].filename) : blog.img_blog;
          img = req.files && req.files['img'] ? req.files['img'].map(function (file) {
            return "".concat(domain, "/").concat(file.filename);
          }) : blog.noidung.map(function (nd) {
            return nd.img;
          }).flat();
          blog.tieude_blog = tieude_blog;
          blog.img_blog = imgblog;
          blog.tieude_khongdau = tieude_khongdau;

          if (Array.isArray(content) && Array.isArray(img) && Array.isArray(tieude)) {
            blog.noidung.forEach(function (nd, index) {
              if (content[index]) {
                var updatedContent = replaceKeywordsWithLinks(content[index], keywords[index], urlBase[index]);
                nd.content = updatedContent;
              }

              nd.keywords = keywords[index];
              nd.urlBase = urlBase[index];
              nd.img = img[index];

              if (tieude[index]) {
                nd.tieude = tieude[index];
              }
            });

            for (i = blog.noidung.length; i < content.length; i++) {
              updatedContent = replaceKeywordsWithLinks(content[i], keywords[i], urlBase[i]);
              blog.noidung.push({
                content: updatedContent,
                img: img[i],
                tieude: tieude[i],
                keywords: keywords[i],
                urlBase: urlBase[i]
              });
            }
          } else {
            _updatedContent3 = replaceKeywordsWithLinks(content, keywords, urlBase);
            blog.noidung = blog.noidung.slice(0, content.length);
            blog.noidung = blog.noidung.map(function (nd) {
              nd.content = _updatedContent3;
              nd.img = img;
              nd.tieude = tieude;
              nd.keywords = keywords;
              nd.urlBase = urlBase;
              return nd;
            });
          }

          _context61.next = 14;
          return regeneratorRuntime.awrap(blog.save());

        case 14:
          res.redirect('/main');
          _context61.next = 21;
          break;

        case 17:
          _context61.prev = 17;
          _context61.t0 = _context61["catch"](0);
          console.error(_context61.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context61.t0)
          });

        case 21:
        case "end":
          return _context61.stop();
      }
    }
  }, null, null, [[0, 17]]);
});
router.post('/deleteblog/:idblog', function _callee62(req, res) {
  var idblog, blog;
  return regeneratorRuntime.async(function _callee62$(_context62) {
    while (1) {
      switch (_context62.prev = _context62.next) {
        case 0:
          _context62.prev = 0;
          idblog = req.params.idblog;
          _context62.next = 4;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findByIdAndDelete(idblog));

        case 4:
          blog = _context62.sent;
          res.redirect('/main');
          _context62.next = 12;
          break;

        case 8:
          _context62.prev = 8;
          _context62.t0 = _context62["catch"](0);
          console.error(_context62.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context62.t0)
          });

        case 12:
        case "end":
          return _context62.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;