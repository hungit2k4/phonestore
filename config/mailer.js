// Cài đặt Nodemailer
const nodemailer = require('nodemailer');

// Tạo transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vg.thanhson@gmail.com', // Thay thế bằng email của bạn
    pass: 'eldw neae yods dkuf', // Thay thế bằng mật khẩu email của bạn
  },
});

// Tạo thông tin email
// Gửi email
exports.sendMail = async (mailOptions) => {
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};


