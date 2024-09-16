"use strict";

var myMD = require("../models/sanpham.model");

var myMDBlog = require("../models/blog.model");

var LoaiSP = require('../models/tenSpModel');

function resizeImage(buffer, width, height) {
  var originalSize, newSize, pixelRatio, step, newBuffer, i, srcIdx, destIdx;
  return regeneratorRuntime.async(function resizeImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          originalSize = Math.ceil(Math.sqrt(buffer.length / 4));
          newSize = Math.ceil(width * height);

          if (!(newSize >= originalSize)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", buffer);

        case 4:
          pixelRatio = originalSize / newSize;
          step = Math.floor(Math.sqrt(pixelRatio));
          newBuffer = Buffer.alloc(newSize * 4);

          for (i = 0; i < newSize; i++) {
            srcIdx = i * step * 4;
            destIdx = i * 4;

            if (srcIdx < buffer.length) {
              newBuffer[destIdx] = buffer[srcIdx];
              newBuffer[destIdx + 1] = buffer[srcIdx + 1];
              newBuffer[destIdx + 2] = buffer[srcIdx + 2];
              newBuffer[destIdx + 3] = buffer[srcIdx + 3];
            } else {
              // Nếu vượt qua kích thước gốc, điền các giá trị mặc định
              newBuffer[destIdx] = 0;
              newBuffer[destIdx + 1] = 0;
              newBuffer[destIdx + 2] = 0;
              newBuffer[destIdx + 3] = 255; // Alpha channel
            }
          }

          return _context.abrupt("return", newBuffer);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

exports.home = function _callee(req, res, next) {
  var list_TL, list_BL;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(myMD.spModel.find());

        case 2:
          list_TL = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.find());

        case 5:
          list_BL = _context2.sent;
          res.render("home/index.ejs", {
            listSP: list_TL,
            listBL: list_BL
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.shop = function _callee2(req, res, next) {
  var list_TL;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(myMD.spModel.find());

        case 2:
          list_TL = _context3.sent;
          res.render("home/shop.ejs", {
            listSP: list_TL
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.home2 = function _callee3(req, res, next) {
  var list_TL, list_BL;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(myMD.spModel.find());

        case 2:
          list_TL = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.find());

        case 5:
          list_BL = _context4.sent;
          res.render("home/shop2.ejs", {
            listSP: list_TL,
            listBL: list_BL
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.contact = function _callee4(req, res, next) {
  var list_TL, tenloai, page;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(myMD.spModel.find());

        case 2:
          list_TL = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.find().lean());

        case 5:
          tenloai = _context5.sent;
          page = parseInt(req.query.page, 10) || 1;
          res.render("home/contact.ejs", {
            listSP: list_TL,
            tenloai: tenloai,
            currentPage: page
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.thanhtoan = function _callee5(req, res, next) {
  var list_TL, tenloai, page;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(myMD.spModel.find());

        case 2:
          list_TL = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(LoaiSP.TenSP.find().lean());

        case 5:
          tenloai = _context6.sent;
          page = parseInt(req.query.page, 10) || 1;
          res.render("home/thanhtoan.ejs", {
            listSP: list_TL,
            tenloai: tenloai,
            currentPage: page
          });

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.searchByName = function _callee6(req, res, next) {
  var searchQuery, regex, searchResults, searchResultsBlog;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          searchQuery = req.query.search;
          regex = new RegExp(searchQuery, 'i');
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(myMD.spModel.find({
            name: regex
          }));

        case 5:
          searchResults = _context7.sent;
          _context7.next = 8;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.find({
            tieude_blog: regex
          }));

        case 8:
          searchResultsBlog = _context7.sent;
          res.render('home/home.ejs', {
            listSP: searchResults,
            listBL: searchResultsBlog
          });
          _context7.next = 16;
          break;

        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](2);
          console.error(_context7.t0);
          res.render('home/home.ejs', {
            listSP: [],
            listBL: []
          });

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 12]]);
};

exports.add = function _callee7(req, res, next) {
  var msg, objSP, imageBuffer, resizedBuffer, new_sp;
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          msg = "";
          console.log(req.body);

          if (!(req.method == "POST")) {
            _context8.next = 50;
            break;
          }

          objSP = new myMD.spModel();
          _context8.prev = 4;
          // Đọc buffer của ảnh từ req.file
          imageBuffer = req.file.buffer; // Thực hiện điều chỉnh kích thước (ví dụ: giảm kích thước xuống 800x600)

          _context8.next = 8;
          return regeneratorRuntime.awrap(resizeImage(imageBuffer, 600, 400));

        case 8:
          resizedBuffer = _context8.sent;
          // Chuyển đổi buffer thành base64
          objSP.img = resizedBuffer.toString('base64');
          _context8.next = 15;
          break;

        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](4);
          msg = _context8.t0.message;

        case 15:
          objSP.name = req.body.name;
          objSP.noidung = req.body.noidung;
          objSP.price = req.body.price;
          objSP.GPU = req.body.GPU;
          objSP.kichthuocmanhinh = req.body.kichthuocmanhinh;
          objSP.congnghemanhinh = req.body.congnghemanhinh;
          objSP.camerasau = req.body.camerasau;
          objSP.cameratruoc = req.body.cameratruoc;
          objSP.chip = req.body.chip;
          objSP.bonho = req.body.bonho;
          objSP.pin = req.body.pin;
          objSP.hedieuhanh = req.body.hedieuhanh;
          objSP.dophangiai = req.body.dophangiai;
          objSP.tinhnangmanhinh = req.body.tinhnangmanhinh;
          objSP.quayvideo = req.body.quayvideo;
          objSP.tinhnangcamera = req.body.tinhnangcamera;
          objSP.kichthuoc = req.body.kichthuoc;
          objSP.trongluong = req.body.trongluong;
          objSP.congnghesac = req.body.congnghesac;
          objSP.congsac = req.body.congsac;
          objSP.kieumanhinh = req.body.kieumanhinh;
          objSP.tinhnagdacbiet = req.body.tinhnagdacbiet;
          objSP.loai = req.body.loai; //ghi vào CSDL

          _context8.prev = 38;
          _context8.next = 41;
          return regeneratorRuntime.awrap(objSP.save());

        case 41:
          new_sp = _context8.sent;
          console.log(new_sp);
          msg = "Lưu thành công";
          res.redirect("/main");
          _context8.next = 50;
          break;

        case 47:
          _context8.prev = 47;
          _context8.t1 = _context8["catch"](38);
          console.log(_context8.t1);

        case 50:
          res.render("home/add.ejs", {
            msg: msg
          });

        case 51:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[4, 12], [38, 47]]);
};

exports.addblog = function _callee8(req, res, next) {
  var msg, objSP, imageBuffer, resizedBuffer, new_sp;
  return regeneratorRuntime.async(function _callee8$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          msg = "";
          console.log(req.body);

          if (!(req.method == "POST")) {
            _context9.next = 29;
            break;
          }

          objSP = new myMDBlog.blogModel();
          _context9.prev = 4;
          // Đọc buffer của ảnh từ req.file
          imageBuffer = req.file.buffer; // Thực hiện điều chỉnh kích thước (ví dụ: giảm kích thước xuống 800x600)

          _context9.next = 8;
          return regeneratorRuntime.awrap(resizeImage(imageBuffer, 600, 400));

        case 8:
          resizedBuffer = _context9.sent;
          // Chuyển đổi buffer thành base64
          objSP.img_blog = resizedBuffer.toString('base64');
          _context9.next = 15;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](4);
          msg = _context9.t0.message;

        case 15:
          objSP.tieude_blog = req.body.tieude_blog;
          objSP.noidung_blog = req.body.noidung_blog; //ghi vào CSDL

          _context9.prev = 17;
          _context9.next = 20;
          return regeneratorRuntime.awrap(objSP.save());

        case 20:
          new_sp = _context9.sent;
          console.log(new_sp);
          msg = "Lưu thành công";
          res.redirect("/main");
          _context9.next = 29;
          break;

        case 26:
          _context9.prev = 26;
          _context9.t1 = _context9["catch"](17);
          console.log(_context9.t1);

        case 29:
          res.render("home/addblog.ejs", {
            msg: msg
          });

        case 30:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[4, 12], [17, 26]]);
};

exports.addJsonBlog = function _callee9(req, res, next) {
  var msg, objSP, imageBuffer, resizedBuffer, new_sp;
  return regeneratorRuntime.async(function _callee9$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          msg = "";
          console.log(req.body);

          if (!(req.method == "POST")) {
            _context10.next = 29;
            break;
          }

          objSP = new myMDBlog.blogModel();
          _context10.prev = 4;
          // Đọc buffer của ảnh từ req.file
          imageBuffer = req.file.buffer; // Thực hiện điều chỉnh kích thước (ví dụ: giảm kích thước xuống 800x600)

          _context10.next = 8;
          return regeneratorRuntime.awrap(resizeImage(imageBuffer, 600, 400));

        case 8:
          resizedBuffer = _context10.sent;
          // Chuyển đổi buffer thành base64
          objSP.img_blog = resizedBuffer.toString('base64');
          _context10.next = 15;
          break;

        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](4);
          msg = _context10.t0.message;

        case 15:
          objSP.tieude_blog = req.body.tieude_blog;
          objSP.noidung_blog = req.body.noidung_blog;
          _context10.prev = 17;
          _context10.next = 20;
          return regeneratorRuntime.awrap(objSP.save());

        case 20:
          new_sp = _context10.sent;
          console.log(new_sp);
          msg = "Lưu thành công";
          _context10.next = 29;
          break;

        case 25:
          _context10.prev = 25;
          _context10.t1 = _context10["catch"](17);
          msg = "Error" + _context10.t1.message();
          console.log(_context10.t1);

        case 29:
          res.send({
            message: msg
          });

        case 30:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[4, 12], [17, 25]]);
};

exports.deleteBlog = function _callee10(req, res, next) {
  var idblog;
  return regeneratorRuntime.async(function _callee10$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          idblog = req.params.idblog;
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findByIdAndDelete(idblog));

        case 4:
          _context11.next = 8;
          break;

        case 6:
          _context11.prev = 6;
          _context11.t0 = _context11["catch"](1);

        case 8:
          res.redirect("/main");

        case 9:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 6]]);
};

exports.deleteJsonBlog = function _callee11(req, res, next) {
  var idblog;
  return regeneratorRuntime.async(function _callee11$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          idblog = req.params.idblog;

          if (!(req.method === "DELETE")) {
            _context12.next = 9;
            break;
          }

          _context12.prev = 2;
          _context12.next = 5;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findByIdAndDelete({
            _id: idblog
          }));

        case 5:
          _context12.next = 9;
          break;

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](2);

        case 9:
          res.send({
            message: 'Xóa thành công'
          });

        case 10:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[2, 7]]);
};

exports.editBlog = function _callee12(req, res, next) {
  var msg, idblog, objSP;
  return regeneratorRuntime.async(function _callee12$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          msg = ""; // Load thông tin sản phẩm

          idblog = req.params.idblog;
          _context13.next = 4;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findById(idblog));

        case 4:
          objSP = _context13.sent;

          if (!(req.method === "POST")) {
            _context13.next = 19;
            break;
          }

          try {
            if (req.file) {
              objSP.img = req.file.buffer.toString('base64');
              console.log(msg);
            }
          } catch (error) {
            msg = error.message;
          }

          objSP.tieude_blog = req.body.tieude_blog;
          objSP.noidung_blog = req.body.noidung_blog;
          _context13.prev = 9;
          _context13.next = 12;
          return regeneratorRuntime.awrap(objSP.save());

        case 12:
          msg = "Cập nhật thành công";
          res.redirect("/main");
          _context13.next = 19;
          break;

        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](9);
          console.log(_context13.t0);

        case 19:
          res.render("home/editBlog.ejs", {
            msg: msg,
            objSP: objSP
          });

        case 20:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[9, 16]]);
};

exports.editBlogJson = function _callee13(req, res, next) {
  var msg, idblog, objSP, new_sp;
  return regeneratorRuntime.async(function _callee13$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          msg = "";
          idblog = req.params.idblog;
          _context14.next = 4;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findById(idblog));

        case 4:
          objSP = _context14.sent;

          if (!(req.method == "PUT")) {
            _context14.next = 20;
            break;
          }

          objSP.tieude_blog = req.body.tieude_blog;
          objSP.noidung_blog = req.body.noidung_blog;
          _context14.prev = 8;
          _context14.next = 11;
          return regeneratorRuntime.awrap(objSP.save());

        case 11:
          new_sp = _context14.sent;
          console.log(new_sp);
          msg = "Sửa thành công";
          _context14.next = 20;
          break;

        case 16:
          _context14.prev = 16;
          _context14.t0 = _context14["catch"](8);
          msg = "Error" + _context14.t0.message();
          console.log(_context14.t0);

        case 20:
          res.send({
            message: msg
          });

        case 21:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[8, 16]]);
};

exports.chitietblog = function _callee14(req, res, next) {
  var idblog, objSP, listBL;
  return regeneratorRuntime.async(function _callee14$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          idblog = req.params.idblog;
          _context15.next = 3;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.findById(idblog));

        case 3:
          objSP = _context15.sent;
          _context15.next = 6;
          return regeneratorRuntime.awrap(myMDBlog.blogModel.find());

        case 6:
          listBL = _context15.sent;
          res.render("home/chitietblog.ejs", {
            objSP: objSP,
            listBL: listBL
          });

        case 8:
        case "end":
          return _context15.stop();
      }
    }
  });
}; //////////


exports.addJson = function _callee15(req, res, next) {
  var msg, objSP, new_sp;
  return regeneratorRuntime.async(function _callee15$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          msg = "";
          console.log(req.body);
          objSP = new myMD.spModel();

          if (!(req.method == "POST")) {
            _context16.next = 40;
            break;
          }

          objSP.img = req.body.img;
          objSP.name = req.body.name;
          objSP.noidung = req.body.noidung;
          objSP.price = req.body.price;
          objSP.GPU = req.body.GPU;
          objSP.kichthuocmanhinh = req.body.kichthuocmanhinh;
          objSP.congnghemanhinh = req.body.congnghemanhinh;
          objSP.camerasau = req.body.camerasau;
          objSP.cameratruoc = req.body.cameratruoc;
          objSP.chip = req.body.chip;
          objSP.bonho = req.body.bonho;
          objSP.pin = req.body.pin;
          objSP.hedieuhanh = req.body.hedieuhanh;
          objSP.dophangiai = req.body.dophangiai;
          objSP.tinhnangmanhinh = req.body.tinhnangmanhinh;
          objSP.quayvideo = req.body.quayvideo;
          objSP.tinhnangcamera = req.body.tinhnangcamera;
          objSP.kichthuoc = req.body.kichthuoc;
          objSP.trongluong = req.body.trongluong;
          objSP.congnghesac = req.body.congnghesac;
          objSP.congsac = req.body.congsac;
          objSP.kieumanhinh = req.body.kieumanhinh;
          objSP.tinhnagdacbiet = req.body.tinhnagdacbiet;
          objSP.loai = req.body.loai;
          _context16.prev = 28;
          _context16.next = 31;
          return regeneratorRuntime.awrap(objSP.save());

        case 31:
          new_sp = _context16.sent;
          console.log(new_sp);
          msg = "Lưu thành công";
          _context16.next = 40;
          break;

        case 36:
          _context16.prev = 36;
          _context16.t0 = _context16["catch"](28);
          msg = "Error" + _context16.t0.message();
          console.log(_context16.t0);

        case 40:
          res.send({
            message: msg
          });

        case 41:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[28, 36]]);
};

exports.edit = function _callee16(req, res, next) {
  var msg, idsp, objSP;
  return regeneratorRuntime.async(function _callee16$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          msg = ""; // Load thông tin sản phẩm

          idsp = req.params.idsp;
          _context17.next = 4;
          return regeneratorRuntime.awrap(myMD.spModel.findById(idsp));

        case 4:
          objSP = _context17.sent;

          if (!(req.method === "POST")) {
            _context17.next = 40;
            break;
          }

          try {
            if (req.file) {
              objSP.img = req.file.buffer.toString('base64');
              console.log(msg);
            }
          } catch (error) {
            msg = error.message;
          } // Cập nhật thông tin sản phẩm


          objSP.name = req.body.name;
          objSP.noidung = req.body.noidung;
          objSP.price = req.body.price;
          objSP.GPU = req.body.GPU;
          objSP.kichthuocmanhinh = req.body.kichthuocmanhinh;
          objSP.congnghemanhinh = req.body.congnghemanhinh;
          objSP.camerasau = req.body.camerasau;
          objSP.cameratruoc = req.body.cameratruoc;
          objSP.chip = req.body.chip;
          objSP.bonho = req.body.bonho;
          objSP.pin = req.body.pin;
          objSP.hedieuhanh = req.body.hedieuhanh;
          objSP.dophangiai = req.body.dophangiai;
          objSP.tinhnangmanhinh = req.body.tinhnangmanhinh;
          objSP.quayvideo = req.body.quayvideo;
          objSP.tinhnangcamera = req.body.tinhnangcamera;
          objSP.kichthuoc = req.body.kichthuoc;
          objSP.trongluong = req.body.trongluong;
          objSP.congnghesac = req.body.congnghesac;
          objSP.congsac = req.body.congsac;
          objSP.kieumanhinh = req.body.kieumanhinh;
          objSP.tinhnagdacbiet = req.body.tinhnagdacbiet;
          objSP.loai = req.body.loai;
          _context17.prev = 30;
          _context17.next = 33;
          return regeneratorRuntime.awrap(objSP.save());

        case 33:
          msg = "Cập nhật thành công";
          res.redirect("/main");
          _context17.next = 40;
          break;

        case 37:
          _context17.prev = 37;
          _context17.t0 = _context17["catch"](30);
          console.log(_context17.t0);

        case 40:
          res.render("home/edit.ejs", {
            msg: msg,
            objSP: objSP
          });

        case 41:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[30, 37]]);
};

exports.editJson = function _callee17(req, res, next) {
  var msg, idsp, objSP, new_sp;
  return regeneratorRuntime.async(function _callee17$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          msg = "";
          idsp = req.params.idsp;
          _context18.next = 4;
          return regeneratorRuntime.awrap(myMD.spModel.findById(idsp));

        case 4:
          objSP = _context18.sent;

          if (!(req.method == "PUT")) {
            _context18.next = 42;
            break;
          }

          objSP.img = req.body.img;
          objSP.name = req.body.name;
          objSP.noidung = req.body.noidung;
          objSP.price = req.body.price;
          objSP.GPU = req.body.GPU;
          objSP.kichthuocmanhinh = req.body.kichthuocmanhinh;
          objSP.congnghemanhinh = req.body.congnghemanhinh;
          objSP.camerasau = req.body.camerasau;
          objSP.cameratruoc = req.body.cameratruoc;
          objSP.chip = req.body.chip;
          objSP.bonho = req.body.bonho;
          objSP.pin = req.body.pin;
          objSP.hedieuhanh = req.body.hedieuhanh;
          objSP.dophangiai = req.body.dophangiai;
          objSP.tinhnangmanhinh = req.body.tinhnangmanhinh;
          objSP.quayvideo = req.body.quayvideo;
          objSP.tinhnangcamera = req.body.tinhnangcamera;
          objSP.kichthuoc = req.body.kichthuoc;
          objSP.trongluong = req.body.trongluong;
          objSP.congnghesac = req.body.congnghesac;
          objSP.congsac = req.body.congsac;
          objSP.kieumanhinh = req.body.kieumanhinh;
          objSP.tinhnagdacbiet = req.body.tinhnagdacbiet;
          objSP.loai = req.body.loai;
          _context18.prev = 30;
          _context18.next = 33;
          return regeneratorRuntime.awrap(objSP.save());

        case 33:
          new_sp = _context18.sent;
          console.log(new_sp);
          msg = "Sửa thành công";
          _context18.next = 42;
          break;

        case 38:
          _context18.prev = 38;
          _context18.t0 = _context18["catch"](30);
          msg = "Error" + _context18.t0.message();
          console.log(_context18.t0);

        case 42:
          res.send({
            message: msg
          });

        case 43:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[30, 38]]);
};

exports.deleteSP = function _callee18(req, res, next) {
  var idsp;
  return regeneratorRuntime.async(function _callee18$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          idsp = req.params.idsp;
          _context19.prev = 1;
          _context19.next = 4;
          return regeneratorRuntime.awrap(myMD.spModel.findByIdAndDelete(idsp));

        case 4:
          _context19.next = 8;
          break;

        case 6:
          _context19.prev = 6;
          _context19.t0 = _context19["catch"](1);

        case 8:
          res.redirect("/main");

        case 9:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[1, 6]]);
};

exports.deleteJson = function _callee19(req, res, next) {
  var idsp;
  return regeneratorRuntime.async(function _callee19$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          idsp = req.params.idsp;

          if (!(req.method === "DELETE")) {
            _context20.next = 9;
            break;
          }

          _context20.prev = 2;
          _context20.next = 5;
          return regeneratorRuntime.awrap(myMD.spModel.findByIdAndDelete({
            _id: idsp
          }));

        case 5:
          _context20.next = 9;
          break;

        case 7:
          _context20.prev = 7;
          _context20.t0 = _context20["catch"](2);

        case 9:
          res.send({
            message: 'Xóa thành công'
          });

        case 10:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[2, 7]]);
};

exports.chitiet = function _callee20(req, res, next) {
  var idsp, objSP, listSP;
  return regeneratorRuntime.async(function _callee20$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          idsp = req.params.idsp;
          _context21.next = 3;
          return regeneratorRuntime.awrap(myMD.spModel.findById(idsp));

        case 3:
          objSP = _context21.sent;
          _context21.next = 6;
          return regeneratorRuntime.awrap(myMD.spModel.find());

        case 6:
          listSP = _context21.sent;
          res.render("home/single-product.ejs", {
            objSP: objSP,
            listSP: listSP
          });

        case 8:
        case "end":
          return _context21.stop();
      }
    }
  });
};