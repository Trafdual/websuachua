const jwt = require('jsonwebtoken')
const checkAuth = (req, res, next) => {
  if (!req.session.token) {
    return res.redirect('/login1')
  }
  try {
    const decoded = jwt.verify(req.session.token, 'mysecretkey', {
      expiresIn: '1d'
    })
    req.userData = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      req.session.destroy()
      return res.redirect('/login1')
    } else {
      console.error(error)
      return res.status(500).json({ message: 'Đã xảy ra lỗi.' })
    }
  }
}
module.exports = checkAuth
