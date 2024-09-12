"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function () {
  var $ = document.querySelector.bind(document);
  var timeRotate = 7000;
  var currentRotate = 0;
  var isRotating = false;
  var wheel = $('.wheel');
  var btnWheel = $('#thuong'); // Nút Quay thưởng

  var btnWheel1 = $('#thu'); // Nút Quay thử

  var showMsg = $('.msg');
  var listGift = [{
    text: 'Wave Alpha 110',
    percent: 0.1
  }, {
    text: 'Quay thêm lượt',
    percent: 0.05
  }, {
    text: '150.000đ',
    percent: 0.2
  }, {
    text: 'Sạc dự phòng 10.000W',
    percent: 0.1
  }, {
    text: 'Tai nghe không dây',
    percent: 0.05
  }, {
    text: 'Iphone 13 New',
    percent: 0.2
  }, {
    text: '5.000.000đ',
    percent: 0.1
  }, {
    text: 'Thay pin miễn phí không giới hạn',
    percent: 0.2
  }];
  var size = listGift.length;
  var rotate = 360 / size;
  var skewY = 90 - rotate;
  listGift.forEach(function (item, index) {
    var elm = document.createElement('li');
    elm.style.transform = "rotate(".concat(rotate * index, "deg) skewY(-").concat(skewY, "deg)");
    var textClasses = ['text-1', 'text-2'];
    var textClass = textClasses[index % textClasses.length];
    elm.innerHTML = "\n            <p style=\"transform: skewY(".concat(skewY, "deg) rotate(").concat(rotate / 2, "deg);\" class=\"text ").concat(textClass, "\">\n                <b>").concat(item.text, "</b>\n            </p>\n        ");
    wheel.appendChild(elm);
  });

  var start = function start(isTest) {
    showMsg.innerHTML = '';
    isRotating = true;
    var random = Math.random();
    var gift = getGift(random, isTest);
    currentRotate += 360 * 10;
    rotateWheel(currentRotate, gift.index);
    showGift(gift);
  };

  var rotateWheel = function rotateWheel(currentRotate, index) {
    wheel.style.transform = "rotate(".concat(currentRotate - index * rotate - rotate / 2, "deg)");
  };

  var getGift = function getGift(randomNumber, isTest) {
    if (isTest) {
      var _ret = function () {
        var prizes = [{
          text: 'Wave Alpha 110',
          percent: 0.1
        }, {
          text: 'Iphone 13 New',
          percent: 0.2
        }, {
          text: 'Other',
          percent: 0.7
        }];
        var cumulativePercent = 0;

        var _loop = function _loop(i) {
          cumulativePercent += prizes[i].percent;

          if (randomNumber < cumulativePercent) {
            if (prizes[i].text === 'Other') {
              var otherGifts = listGift.filter(function (gift) {
                return gift.text !== 'Wave Alpha 110' && gift.text !== 'Iphone 13 New';
              });
              var randomOtherIndex = Math.floor(Math.random() * otherGifts.length);
              return {
                v: {
                  v: _objectSpread({}, otherGifts[randomOtherIndex], {
                    index: listGift.indexOf(otherGifts[randomOtherIndex])
                  })
                }
              };
            } else {
              var selectedIndex = listGift.findIndex(function (gift) {
                return gift.text === prizes[i].text;
              });
              return {
                v: {
                  v: _objectSpread({}, listGift[selectedIndex], {
                    index: selectedIndex
                  })
                }
              };
            }
          }
        };

        for (var i = 0; i < prizes.length; i++) {
          var _ret2 = _loop(i);

          if (_typeof(_ret2) === "object") return _ret2.v;
        }
      }();

      if (_typeof(_ret) === "object") return _ret.v;
    } else {
      var fixedGiftIndex = listGift.findIndex(function (gift) {
        return gift.text === 'Tai nghe không dây';
      });
      return _objectSpread({}, listGift[fixedGiftIndex], {
        index: fixedGiftIndex
      });
    }
  };

  var updateUserInfo = function updateUserInfo(gift) {
    var userInfoList = document.querySelector('.user-info');
    var listItem = document.createElement('p');
    listItem.classList.add('thongtin');
    listItem.textContent = "B\u1EA1n \u0111\xE3 tr\xFAng \"".concat(gift.text, "\"");
    userInfoList.appendChild(listItem); // Thêm thẻ <p> mới vào danh sách user-info
  };

  var showGift = function showGift(gift) {
    var timer = setTimeout(function () {
      isRotating = false;
      showMsg.innerHTML = "Ch\xFAc m\u1EEBng b\u1EA1n \u0111\xE3 nh\u1EADn \u0111\u01B0\u1EE3c \"".concat(gift.text, "\"");
      updateUserInfo(gift);
      clearTimeout(timer);
    }, timeRotate);
  };

  btnWheel.addEventListener('click', function () {
    !isRotating && start(false);
    var path = window.location.pathname; // Lấy đường dẫn từ URL

    var segments = path.split('/'); // Tách đường dẫn thành các phần tử

    var id = segments[segments.length - 1]; // ID là phần tử cuối cùng

    console.log('ID from URL:', id);
    fetch("/postIsquay/".concat(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.message === 'thành công') {
        btnWheel.style.display = 'none';
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  });
  btnWheel1.addEventListener('click', function () {
    !isRotating && start(true);
  });
})();