"use strict";

var db = require('./db');

var notifySchema = new db.mongoose.Schema({
  tenkhach: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  cccd: {
    type: String
  },
  tensp: {
    type: String
  },
  price: {
    type: String
  },
  address: {
    type: String
  },
  idsp: {
    type: db.mongoose.Schema.Types.ObjectId,
    ref: 'chitietsp'
  },
  isRead: {
    type: Boolean,
    "default": false
  },
  date: {
    type: Date
  },
  isQuay: {
    type: Boolean,
    "default": false
  }
});
var notify = db.mongoose.model('notify', notifySchema);
module.exports = {
  notify: notify
};