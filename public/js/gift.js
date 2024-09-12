;(() => {
  const $ = document.querySelector.bind(document)

  let timeRotate = 7000
  let currentRotate = 0
  let isRotating = false
  const wheel = $('.wheel')
  const btnWheel = $('#thuong') // Nút Quay thưởng
  const btnWheel1 = $('#thu') // Nút Quay thử

  const showMsg = $('.msg')

  const listGift = [
    { text: 'Wave Alpha 110', percent: 0.1 },
    { text: 'Quay thêm lượt', percent: 0.05 },
    { text: '150.000đ', percent: 0.2 },
    { text: 'Sạc dự phòng 10.000W', percent: 0.1 },
    { text: 'Tai nghe không dây', percent: 0.05 },
    { text: 'Iphone 13 New', percent: 0.2 },
    { text: '5.000.000đ', percent: 0.1 },
    { text: 'Thay pin miễn phí không giới hạn', percent: 0.2 }
  ]

  const size = listGift.length
  const rotate = 360 / size
  const skewY = 90 - rotate

  listGift.forEach((item, index) => {
    const elm = document.createElement('li')
    elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`
    const textClasses = ['text-1', 'text-2']
    const textClass = textClasses[index % textClasses.length]
    elm.innerHTML = `
            <p style="transform: skewY(${skewY}deg) rotate(${
      rotate / 2
    }deg);" class="text ${textClass}">
                <b>${item.text}</b>
            </p>
        `
    wheel.appendChild(elm)
  })

  const start = isTest => {
    showMsg.innerHTML = ''
    isRotating = true

    const random = Math.random()
    const gift = getGift(random, isTest)

    currentRotate += 360 * 10
    rotateWheel(currentRotate, gift.index)
    showGift(gift)
  }

  const rotateWheel = (currentRotate, index) => {
    wheel.style.transform = `rotate(${
      currentRotate - index * rotate - rotate / 2
    }deg)`
  }

  const getGift = (randomNumber, isTest) => {
    if (isTest) {
      const prizes = [
        { text: 'Wave Alpha 110', percent: 0.1 },
        { text: 'Iphone 13 New', percent: 0.2 },
        { text: 'Other', percent: 0.7 }
      ]
      let cumulativePercent = 0
      for (let i = 0; i < prizes.length; i++) {
        cumulativePercent += prizes[i].percent
        if (randomNumber < cumulativePercent) {
          if (prizes[i].text === 'Other') {
            const otherGifts = listGift.filter(
              gift =>
                gift.text !== 'Wave Alpha 110' && gift.text !== 'Iphone 13 New'
            )
            const randomOtherIndex = Math.floor(
              Math.random() * otherGifts.length
            )
            return {
              ...otherGifts[randomOtherIndex],
              index: listGift.indexOf(otherGifts[randomOtherIndex])
            }
          } else {
            const selectedIndex = listGift.findIndex(
              gift => gift.text === prizes[i].text
            )
            return { ...listGift[selectedIndex], index: selectedIndex }
          }
        }
      }
    } else {
      const fixedGiftIndex = listGift.findIndex(
        gift => gift.text === 'Tai nghe không dây'
      )
      return { ...listGift[fixedGiftIndex], index: fixedGiftIndex }
    }
  }

  const updateUserInfo = gift => {
    const userInfoList = document.querySelector('.user-info')
    const listItem = document.createElement('p')
    listItem.classList.add('thongtin')
    listItem.textContent = `Bạn đã trúng "${gift.text}"`
    userInfoList.appendChild(listItem) // Thêm thẻ <p> mới vào danh sách user-info
  }

  const showGift = gift => {
    let timer = setTimeout(() => {
      isRotating = false
      showMsg.innerHTML = `Chúc mừng bạn đã nhận được "${gift.text}"`
      updateUserInfo(gift)
      clearTimeout(timer)
    }, timeRotate)
  }

  btnWheel.addEventListener('click', () => {
    !isRotating && start(false)
  })

  btnWheel1.addEventListener('click', () => {
    !isRotating && start(true)
  })
})()
