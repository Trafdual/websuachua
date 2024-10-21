"use strict";

var express = require('express');

var router = express.Router();

var Sp = require('../models/chitietSpModel');

var LoaiSP = require('../models/tenSpModel');

var DungLuong = require('../models/dungluongModel');

var moment = require('moment');

var momenttimezone = require('moment-timezone');

var MauSac = require('../models/MauSacModel');

var test = require('../models/tesmodel');

var clients = [];
var hasSentMessage = false;
router.get('/events', function (req, res) {
  console.log('Client connected to events API'); // Thông báo khi có client kết nối

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    clients.push(res); // Dọn dẹp khi client ngắt kết nối

    req.on('close', function () {
      clients = clients.filter(function (client) {
        return client !== res;
      });
      console.log('Client disconnected from events API');
    });
  } catch (error) {
    console.error('Error in events API:', error);
    res.status(500).send('Internal Server Error');
  }
}); // Hàm gửi sự kiện cho tất cả client

var sendEvent = function sendEvent(data) {
  clients.forEach(function (client) {
    client.write("data: ".concat(JSON.stringify(data), "\n\n"));
  });
};

router.get('/testmodel', function _callee(req, res) {
  var test1;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(test.testmodel.find().lean());

        case 3:
          test1 = _context.sent;
          res.json(test1);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/posttestmodel', function _callee2(req, res) {
  var name, test1;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          name = req.body.name;
          test1 = new test.testmodel({
            name: name
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(test1.save());

        case 5:
          sendEvent({
            message: "S\u1EA3n ph\u1EA9m m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c th\xEAm: ".concat(name)
          });
          res.json(test1);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context2.t0)
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post('/postdungluong/:idloaisp', function _callee3(req, res) {
  var idloaisp, name, loaisp, dungluong;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          idloaisp = req.params.idloaisp;
          name = req.body.name;
          _context3.next = 5;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(idloaisp));

        case 5:
          loaisp = _context3.sent;
          dungluong = new DungLuong.dungluong({
            name: name
          });
          loaisp.dungluongmay.push(dungluong._id);
          _context3.next = 10;
          return regeneratorRuntime.awrap(dungluong.save());

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(loaisp.save());

        case 12:
          res.redirect("/dungluong/".concat(loaisp._id));
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context3.t0)
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
router.get('/dungluong/:idloaisp', function _callee5(req, res) {
  var idloaisp, loaisp, dungluong;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          idloaisp = req.params.idloaisp;
          _context5.next = 4;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(idloaisp));

        case 4:
          loaisp = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(Promise.all(loaisp.dungluongmay.map(function _callee4(dl) {
            var dluong;
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(DungLuong.dungluong.findById(dl._id));

                  case 2:
                    dluong = _context4.sent;
                    return _context4.abrupt("return", {
                      _id: dluong._id,
                      name: dluong.name
                    });

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          })));

        case 7:
          dungluong = _context5.sent;
          res.render('sanphammoi/dungluong.ejs', {
            dungluong: dungluong,
            idloaisp: idloaisp
          });
          _context5.next = 15;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context5.t0)
          });

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.post('/deletedungluong/:iddungluong/:idloaisp', function _callee6(req, res) {
  var iddungluong, idloaisp, loaisp, dungluong;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          iddungluong = req.params.iddungluong;
          idloaisp = req.params.idloaisp;
          _context6.next = 5;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(idloaisp));

        case 5:
          loaisp = _context6.sent;
          _context6.next = 8;
          return regeneratorRuntime.awrap(DungLuong.dungluong.findById(iddungluong));

        case 8:
          dungluong = _context6.sent;
          loaisp.dungluongmay = loaisp.dungluongmay.filter(function (dungluong1) {
            return dungluong1.toString() !== dungluong._id;
          });
          _context6.next = 12;
          return regeneratorRuntime.awrap(loaisp.save());

        case 12:
          _context6.next = 14;
          return regeneratorRuntime.awrap(DungLuong.dungluong.findByIdAndDelete(iddungluong));

        case 14:
          res.redirect("/dungluong/".concat(idloaisp));
          _context6.next = 21;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context6.t0)
          });

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 17]]);
});
router.get('/getadddungluong/:idloaisp', function _callee7(req, res) {
  var idloaisp, loaisp;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          idloaisp = req.params.idloaisp;
          _context7.next = 4;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(idloaisp));

        case 4:
          loaisp = _context7.sent;
          res.render('sanphammoi/addduluong.ejs', {
            idloaisp: loaisp._id
          });
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context7.t0)
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/postmausac/:iddungluong', function _callee8(req, res) {
  var iddungluong, dungluong, name, mausac;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          iddungluong = req.params.iddungluong;
          _context8.next = 4;
          return regeneratorRuntime.awrap(DungLuong.dungluong.findById(iddungluong));

        case 4:
          dungluong = _context8.sent;
          name = req.body.name;
          mausac = new MauSac.mausac({
            name: name
          });
          dungluong.mausac.push(mausac._id);
          _context8.next = 10;
          return regeneratorRuntime.awrap(mausac.save());

        case 10:
          _context8.next = 12;
          return regeneratorRuntime.awrap(dungluong.save());

        case 12:
          res.redirect("/mausac/".concat(iddungluong));
          _context8.next = 19;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context8.t0)
          });

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
router.get('/mausac/:iddungluong', function _callee10(req, res) {
  var iddungluong, dungluong, mausac;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          iddungluong = req.params.iddungluong;
          _context10.next = 4;
          return regeneratorRuntime.awrap(DungLuong.dungluong.findById(iddungluong));

        case 4:
          dungluong = _context10.sent;
          _context10.next = 7;
          return regeneratorRuntime.awrap(Promise.all(dungluong.mausac.map(function _callee9(ms) {
            var maus;
            return regeneratorRuntime.async(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return regeneratorRuntime.awrap(MauSac.mausac.findById(ms._id));

                  case 2:
                    maus = _context9.sent;
                    return _context9.abrupt("return", {
                      _id: maus._id,
                      name: maus.name
                    });

                  case 4:
                  case "end":
                    return _context9.stop();
                }
              }
            });
          })));

        case 7:
          mausac = _context10.sent;
          res.render('sanphammoi/mausac.ejs', {
            mausac: mausac,
            iddungluong: iddungluong
          });
          _context10.next = 15;
          break;

        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context10.t0)
          });

        case 15:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/getaddmausac/:iddungluong', function _callee11(req, res) {
  var iddungluong;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          try {
            iddungluong = req.params.iddungluong;
            res.render('sanphammoi/addmausac.ejs', {
              iddungluong: iddungluong
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(error)
            });
          }

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
});
router.get('/getputmausac/:idmausac/:idungluong', function _callee12(req, res) {
  var idmausac, idungluong, mausac;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          idmausac = req.params.idmausac;
          idungluong = req.params.idungluong;
          _context12.next = 5;
          return regeneratorRuntime.awrap(MauSac.mausac.findById(idmausac));

        case 5:
          mausac = _context12.sent;
          res.render('sanphammoi/putmausac.ejs', {
            idmausac: idmausac,
            mausac: mausac,
            idungluong: idungluong
          });
          _context12.next = 13;
          break;

        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](0);
          console.error(_context12.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context12.t0)
          });

        case 13:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post('/putmausac/:idmausac/:idungluong', function _callee13(req, res) {
  var name, iddungluong, idmausac, mausac;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          name = req.body.name;
          iddungluong = req.params.idungluong;
          idmausac = req.params.idmausac;
          _context13.next = 6;
          return regeneratorRuntime.awrap(MauSac.mausac.findById(idmausac));

        case 6:
          mausac = _context13.sent;
          mausac.name = name;
          _context13.next = 10;
          return regeneratorRuntime.awrap(mausac.save());

        case 10:
          res.redirect("/mausac/".concat(iddungluong));
          _context13.next = 17;
          break;

        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context13.t0)
          });

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get('/phantram/:idmausac', function _callee14(req, res) {
  var idmausac, mausac, phantram;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          idmausac = req.params.idmausac;
          _context14.next = 4;
          return regeneratorRuntime.awrap(MauSac.mausac.findById(idmausac));

        case 4:
          mausac = _context14.sent;
          _context14.next = 7;
          return regeneratorRuntime.awrap(Promise.all(mausac.chitiet.map(function (ct) {
            return {
              _id: ct._id,
              name: ct.name,
              price: ct.price
            };
          })));

        case 7:
          phantram = _context14.sent;
          res.render('sanphammoi/phantram.ejs', {
            phantram: phantram,
            idmausac: idmausac
          });
          _context14.next = 15;
          break;

        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context14.t0)
          });

        case 15:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/getaddphantram/:idmausac', function _callee15(req, res) {
  var idmausac;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          try {
            idmausac = req.params.idmausac;
            res.render('sanphammoi/addphamtram.ejs', {
              idmausac: idmausac
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(error)
            });
          }

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
});
router.post('/postphantram/:idmausac', function _callee16(req, res) {
  var idmausac, mausac, _req$body, name, price;

  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          idmausac = req.params.idmausac;
          _context16.next = 4;
          return regeneratorRuntime.awrap(MauSac.mausac.findById(idmausac));

        case 4:
          mausac = _context16.sent;
          _req$body = req.body, name = _req$body.name, price = _req$body.price;
          mausac.chitiet.push({
            name: name,
            price: price
          });
          _context16.next = 9;
          return regeneratorRuntime.awrap(mausac.save());

        case 9:
          res.redirect("/phantram/".concat(idmausac));
          _context16.next = 16;
          break;

        case 12:
          _context16.prev = 12;
          _context16.t0 = _context16["catch"](0);
          console.error(_context16.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context16.t0)
          });

        case 16:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.get('/geteditphantram/:idmausac/:id', function _callee17(req, res) {
  var idmausac, id, mausac, index, phantram;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          idmausac = req.params.idmausac;
          id = req.params.id;
          _context17.next = 5;
          return regeneratorRuntime.awrap(MauSac.mausac.findById(idmausac));

        case 5:
          mausac = _context17.sent;
          index = mausac.chitiet.findIndex(function (ct) {
            return ct._id.toString() === id;
          });
          phantram = {
            name: mausac.chitiet[index].name,
            price: mausac.chitiet[index].price
          };
          res.render('sanphammoi/editphantram.ejs', {
            phantram: phantram,
            idmausac: idmausac,
            id: id
          });
          _context17.next = 15;
          break;

        case 11:
          _context17.prev = 11;
          _context17.t0 = _context17["catch"](0);
          console.error(_context17.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context17.t0)
          });

        case 15:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.post('/editphantram/:idmausac/:id', function _callee18(req, res) {
  var idmausac, id, _req$body2, name, price, mausac, index;

  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          idmausac = req.params.idmausac;
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, price = _req$body2.price;
          _context18.next = 6;
          return regeneratorRuntime.awrap(MauSac.mausac.findById(idmausac));

        case 6:
          mausac = _context18.sent;
          index = mausac.chitiet.findIndex(function (ct) {
            return ct._id.toString() === id;
          });

          if (!(index !== -1)) {
            _context18.next = 13;
            break;
          }

          mausac.chitiet[index].name = name;
          mausac.chitiet[index].price = price;
          _context18.next = 14;
          break;

        case 13:
          return _context18.abrupt("return", res.status(404).json({
            message: 'Không tìm thấy id trong danh sách phần trăm'
          }));

        case 14:
          _context18.next = 16;
          return regeneratorRuntime.awrap(mausac.save());

        case 16:
          res.redirect("/phantram/".concat(idmausac));
          _context18.next = 23;
          break;

        case 19:
          _context18.prev = 19;
          _context18.t0 = _context18["catch"](0);
          console.error(_context18.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context18.t0)
          });

        case 23:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 19]]);
});
module.exports = router;