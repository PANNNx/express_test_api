const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  letter: String,
  digit: String,
  province: String,
  type: String,
  caseNumber: String,
  arrestDate: { type: Date, default: Date.now },
  expireDate: Date,
  circumstances: String,
  owner: String,
  department: String,
  tel: String,
  active: { type: Boolean, default: true },
  images: [String], // Path to the uploaded image
  attachments: [String], // Path to the uploaded attachment
},{ timestamps: true });

module.exports = mongoose.model('Items', itemSchema);