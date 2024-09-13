"use strict";

var md = require('../../models/user.model');

var jwt = require('jsonwebtoken');

exports.register = function _callee(req, res, next) {
  var msg, objU;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          msg = ' ';

          if (!(req.method == 'POST')) {
            _context.next = 20;
            break;
          }

          console.log(req.body); // kiem tra hop  le

          if (!(req.body.passwrd != req.body.passwrd2)) {
            _context.next = 6;
            break;
          }

          msg = 'Xác nhận pasword không hợp lệ';
          return _context.abrupt("return", res.render('settings/register', {
            msg: msg
          }));

        case 6:
          objU = md.UserModel();
          objU.ten = req.body.ten;
          objU.email = req.body.email;
          objU.sdt = req.body.sdt;
          objU.passwrd = req.body.passwrd;
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(objU.save());

        case 14:
          msg = 'Đăng ký thành công';
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](11);
          msg = _context.t0.messgage;

        case 20:
          res.render('settings/register', {
            msg: msg
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 17]]);
};

exports.login = function _callee2(req, res, next) {
  var msg, objU, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          msg = ' ';

          if (!(req.method == 'POST')) {
            _context2.next = 27;
            break;
          }

          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(md.UserModel.findOne({
            ten: req.body.ten
          }));

        case 5:
          objU = _context2.sent;
          // findOne la tim 1 doi tuong
          console.log(objU);

          if (!(req.body.ten == "")) {
            _context2.next = 11;
            break;
          }

          msg = 'mời nhập tên đăng nhập';
          _context2.next = 23;
          break;

        case 11:
          if (!(objU != null)) {
            _context2.next = 22;
            break;
          }

          if (!(objU.passwrd == req.body.passwrd)) {
            _context2.next = 19;
            break;
          }

          token = jwt.sign({
            userId: objU._id
          }, 'mysecretkey', {
            expiresIn: '10m'
          });
          req.session.userLogin = objU;
          req.session.token = token;
          return _context2.abrupt("return", res.redirect('/main'));

        case 19:
          msg = 'sai password';

        case 20:
          _context2.next = 23;
          break;

        case 22:
          msg = 'User không tồn tại: ' + req.body.ten;

        case 23:
          _context2.next = 27;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](2);

        case 27:
          res.render('settings/login', {
            msg: msg
          });

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 25]]);
};

exports.login1 = function _callee3(req, res, next) {
  var msg, objU, token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          msg = ' ';

          if (!(req.method == 'POST')) {
            _context3.next = 27;
            break;
          }

          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(md.UserModel.findOne({
            ten: req.body.ten
          }));

        case 5:
          objU = _context3.sent;
          // findOne la tim 1 doi tuong
          console.log(objU);

          if (!(req.body.ten == '')) {
            _context3.next = 11;
            break;
          }

          msg = 'mời nhập tên đăng nhập';
          _context3.next = 23;
          break;

        case 11:
          if (!(objU != null)) {
            _context3.next = 22;
            break;
          }

          if (!(objU.passwrd == req.body.passwrd)) {
            _context3.next = 19;
            break;
          }

          token = jwt.sign({
            userId: objU._id
          }, 'mysecretkey', {
            expiresIn: '10m'
          });
          req.session.userLogin = objU;
          req.session.token = token;
          return _context3.abrupt("return", res.redirect('/donhang'));

        case 19:
          msg = 'sai password';

        case 20:
          _context3.next = 23;
          break;

        case 22:
          msg = 'User không tồn tại: ' + req.body.ten;

        case 23:
          _context3.next = 27;
          break;

        case 25:
          _context3.prev = 25;
          _context3.t0 = _context3["catch"](2);

        case 27:
          res.render('settings/login1', {
            msg: msg
          });

        case 28:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 25]]);
};