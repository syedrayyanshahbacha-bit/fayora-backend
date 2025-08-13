const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"FAYORA" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log(`📧 Email sent to: ${to}`);
  } catch (err) {
    console.error('❌ Email sending error:', err.message);
  }
};

module.exports = sendEmail;