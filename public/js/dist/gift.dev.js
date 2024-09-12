"use strict";

(function () {
  var $ = document.querySelector.bind(document);
  var timeRotate = 7000;
  var currentRotate = 0;
  var isRotating = false;
  var wheel = $('.wheel');
  var btnWheel = $('.btn--wheel');
  var showMsg = $('.msg'); // Danh sách phần thưởng với hình ảnh

  var listGift = [{
    text: 'Sạc dự phòng 10.000W',
    percent: 10 / 100,
    img: 'http://localhost:8080/images/review-item1.jpg'
  }, {
    text: 'Wave Alpha 110',
    percent: 10 / 100,
    img: 'images/review-item2.jpg'
  }, {
    text: 'Quay thêm lượt',
    percent: 5 / 100,
    img: 'images/review-item1.jpg'
  }, {
    text: 'Tai nghe không dây',
    percent: 5 / 100,
    img: 'images/review-item1.jpg'
  }, {
    text: 'Iphone 13',
    percent: 40 / 100,
    img: 'images/review-item1.jpg'
  }, {
    text: '5.000.000đ',
    percent: 20 / 100,
    img: 'images/review-item2.jpg'
  }]; // Số lượng phần thưởng

  var size = listGift.length; // Số đo góc của 1 phần thưởng chiếm trên hình tròn

  var rotate = 360 / size; // Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm

  var skewY = 90 - rotate;
  listGift.forEach(function (item, index) {
    // Tạo thẻ li
    var elm = document.createElement('li'); // Xoay và tạo độ nghiêng cho các thẻ li

    elm.style.transform = "rotate(".concat(rotate * index, "deg) skewY(-").concat(skewY, "deg)"); // Thêm văn bản và hình ảnh vào thẻ li

    var textClasses = ['text-1', 'text-2'];
    var textClass = textClasses[index % textClasses.length];
    elm.innerHTML = "\n    <p style=\"transform: skewY(".concat(skewY, "deg) rotate(").concat(rotate / 2, "deg);\" class=\"text ").concat(textClass, "\">\n        <b>").concat(item.text, "</b>\n    </p>\n    <img src=\"").concat(item.img, "\" alt=\"").concat(item.text, "\" class=\"image\">\n"); // Thêm vào thẻ ul

    wheel.appendChild(elm);
  }); // Hàm bắt đầu

  var start = function start() {
    showMsg.innerHTML = '';
    isRotating = true; // Lấy 1 số ngẫu nhiên 0 -> 1

    var random = Math.random(); // Gọi hàm lấy phần thưởng

    var gift = getGift(random); // Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại)

    currentRotate += 360 * 10; // Gọi hàm quay

    rotateWheel(currentRotate, gift.index); // Gọi hàm in ra màn hình

    showGift(gift);
  }; // Hàm quay vòng quay


  var rotateWheel = function rotateWheel(currentRotate, index) {
    $('.wheel').style.transform = "rotate(".concat( // Góc quay hiện tại trừ góc của phần thưởng
    // Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa
    currentRotate - index * rotate - rotate / 2, "deg)");
  }; // Hàm lấy phần thưởng, chỉ chọn hai phần thưởng cụ thể


  var getGift = function getGift(randomNumber) {
    // Danh sách phần thưởng chỉ quay vào hai phần thưởng cụ thể
    var specialGifts = [{
      text: 'Tai nghe không dây',
      index: listGift.findIndex(function (gift) {
        return gift.text === 'Tai nghe không dây';
      })
    }, {
      text: 'Tai nghe không dây',
      index: listGift.findIndex(function (gift) {
        return gift.text === 'Tai nghe không dây';
      })
    }]; // Xác suất cho các phần thưởng đặc biệt

    var specialGiftsPercent = 0.5; // 50% cho mỗi phần thưởng đặc biệt
    // Chọn phần thưởng dựa trên số ngẫu nhiên

    var randomSpecial = Math.random();
    var selectedGift = specialGifts[Math.floor(randomSpecial * 2)];
    return selectedGift;
  }; // In phần thưởng ra màn hình


  var showGift = function showGift(gift) {
    var timer = setTimeout(function () {
      isRotating = false;
      showMsg.innerHTML = "Ch\xFAc m\u1EEBng b\u1EA1n \u0111\xE3 nh\u1EADn \u0111\u01B0\u1EE3c \"".concat(listGift[gift.index].text, "\"");
      clearTimeout(timer);
    }, timeRotate);
  }; // Sự kiện click button start


  btnWheel.addEventListener('click', function () {
    !isRotating && start();
  });
})();