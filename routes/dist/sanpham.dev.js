"use strict";

var express = require('express');

var router = express.Router();

var Sp = require('../models/chitietSpModel');

var LoaiSP = require('../models/tenSpModel');

var DungLuong = require('../models/dungluongModel');

var moment = require('moment');

var momenttimezone = require('moment-timezone');

var MauSac = require('../models/MauSacModel');

router.post('/postdungluong/:idloaisp', function _callee(req, res) {
  var idloaisp, name, loaisp, dungluong;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          idloaisp = req.params.idloaisp;
          name = req.body.name;
          _context.next = 5;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(idloaisp));

        case 5:
          loaisp = _context.sent;
          dungluong = new DungLuong.dungluong({
            name: name
          });
          loaisp.dungluongmay.push(dungluong._id);
          _context.next = 10;
          return regeneratorRuntime.awrap(dungluong.save());

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(loaisp.save());

        case 12:
          res.redirect("/dungluong/".concat(loaisp._id));
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context.t0)
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
router.get('/dungluong/:idloaisp', function _callee3(req, res) {
  var idloaisp, loaisp, dungluong;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          idloaisp = req.params.idloaisp;
          _context3.next = 4;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(idloaisp));

        case 4:
          loaisp = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Promise.all(loaisp.dungluongmay.map(function _callee2(dl) {
            var dluong;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(DungLuong.dungluong.findById(dl._id));

                  case 2:
                    dluong = _context2.sent;
                    return _context2.abrupt("return", {
                      _id: dluong._id,
                      name: dluong.name
                    });

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          })));

        case 7:
          dungluong = _context3.sent;
          res.render('sanphammoi/dungluong.ejs', {
            dungluong: dungluong,
            idloaisp: idloaisp
          });
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context3.t0)
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/getadddungluong/:idloaisp', function _callee4(req, res) {
  var idloaisp, loaisp;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          idloaisp = req.params.idloaisp;
          _context4.next = 4;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.findById(idloaisp));

        case 4:
          loaisp = _context4.sent;
          res.render('sanphammoi/addduluong.ejs', {
            idloaisp: loaisp._id
          });
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
router.post('/postmausac/:iddungluong', function _callee5(req, res) {
  var iddungluong, dungluong, name, mausac;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          iddungluong = req.params.iddungluong;
          _context5.next = 4;
          return regeneratorRuntime.awrap(DungLuong.dungluong.findById(iddungluong));

        case 4:
          dungluong = _context5.sent;
          name = req.body.name;
          mausac = new MauSac.mausac({
            name: name
          });
          dungluong.mausac.push(mausac._id);
          _context5.next = 10;
          return regeneratorRuntime.awrap(mausac.save());

        case 10:
          _context5.next = 12;
          return regeneratorRuntime.awrap(dungluong.save());

        case 12:
          res.redirect("/mausac/".concat(iddungluong));
          _context5.next = 19;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context5.t0)
          });

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
router.get('/mausac/:iddungluong', function _callee7(req, res) {
  var iddungluong, dungluong, mausac;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          iddungluong = req.params.iddungluong;
          _context7.next = 4;
          return regeneratorRuntime.awrap(DungLuong.dungluong.findById(iddungluong));

        case 4:
          dungluong = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(Promise.all(dungluong.mausac.map(function _callee6(ms) {
            var maus;
            return regeneratorRuntime.async(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return regeneratorRuntime.awrap(MauSac.mausac.findById(ms._id));

                  case 2:
                    maus = _context6.sent;
                    return _context6.abrupt("return", {
                      _id: maus._id,
                      name: maus.name
                    });

                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          })));

        case 7:
          mausac = _context7.sent;
          res.render('sanphammoi/mausac.ejs', {
            mausac: mausac,
            iddungluong: iddungluong
          });
          _context7.next = 15;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context7.t0)
          });

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/getaddmausac/:iddungluong', function _callee8(req, res) {
  var iddungluong;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
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
          return _context8.stop();
      }
    }
  });
});
router.get('/phantram/:idmausac', function _callee9(req, res) {
  var idmausac, mausac, phantram;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          idmausac = req.params.idmausac;
          _context9.next = 4;
          return regeneratorRuntime.awrap(MauSac.mausac.findById(idmausac));

        case 4:
          mausac = _context9.sent;
          _context9.next = 7;
          return regeneratorRuntime.awrap(Promise.all(mausac.chitiet.map(function (ct) {
            return {
              name: ct.name,
              price: ct.price
            };
          })));

        case 7:
          phantram = _context9.sent;
          res.render('sanphammoi/phantram.ejs', {
            phantram: phantram,
            idmausac: idmausac
          });
          _context9.next = 15;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context9.t0)
          });

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.get('/getaddphantram/:idmausac', function _callee10(req, res) {
  var idmausac;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
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
          return _context10.stop();
      }
    }
  });
});
router.post('/postphantram/:idmausac', function _callee11(req, res) {
  var idmausac, mausac, _req$body, name, price;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          idmausac = req.params.idmausac;
          _context11.next = 4;
          return regeneratorRuntime.awrap(MauSac.mausac.findById(idmausac));

        case 4:
          mausac = _context11.sent;
          _req$body = req.body, name = _req$body.name, price = _req$body.price;
          mausac.chitiet.push({
            name: name,
            price: price
          });
          _context11.next = 9;
          return regeneratorRuntime.awrap(mausac.save());

        case 9:
          res.redirect("/phantram/".concat(idmausac));
          _context11.next = 16;
          break;

        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          res.status(500).json({
            message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(_context11.t0)
          });

        case 16:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
module.exports = router;