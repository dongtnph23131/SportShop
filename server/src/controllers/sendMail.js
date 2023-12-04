import nodemailer from "nodemailer";

export const sendEmail = async (
  to,
  subject,
  text,
  customerName,
  orderHtmlContent
) => {
  const htmlContent = `
    <div style="display: flex; justify-content: center; color: black;">
    <div style="color: black; margin: auto;">
      <img src="https://i.imgur.com/QKplh0e.jpg" alt="Logo" style="max-width: 250px; max-height: 250px; margin: auto; display: block;">
      <h3 style="color: black;">Hi ${customerName},</h3>
      <p style="color: black;">Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được ghi nhận.</p>
      ${orderHtmlContent}
    </div>
  </div>
  `;
  const transporter = nodemailer.createTransport({
    tls: {
      rejectUnauthorized: false,
    },
    service: "gmail",
    auth: {
      user: "tranngocdong2042003@gmail.com",
      pass: process.env.PasswordMail,
    },
  });

  const mailOptions = {
    from: "tranngocdong2042003@gmail.com",
    to: to,
    subject: "Đơn hàng của bạn",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {}
};
