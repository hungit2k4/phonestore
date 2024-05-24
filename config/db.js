const mongoose = require('mongoose');

const local = "mongodb://127.0.0.1:27017/ShopDB";
const atlas = "mongodb+srv://root:10012004@cluster0.y5rj2ot.mongodb.net/";
// Kết nối đến cơ sở dữ liệu MongoDB
const connect = async () => {
  try {
    await mongoose.connect(local);
    console.log("Connect to db success");
  } catch (error) {
    console.log(error);
    console.log('can not connect to db');
  }
};
module.exports = { connect };
