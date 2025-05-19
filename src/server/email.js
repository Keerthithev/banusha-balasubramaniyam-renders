
/**
 * This file is a placeholder for the backend implementation of nodemailer
 * In a real production environment, this would be a server-side implementation
 * 
 * For a production app, you would:
 * 1. Create a Node.js backend (Express, etc.)
 * 2. Implement this email sending functionality there
 * 3. Call it from your frontend via API
 */

// Example Node.js backend implementation
const nodemailer = require('nodemailer');

// Create a test account or configure with real SMTP credentials
const createTransporter = async () => {
  // For production
  // return nodemailer.createTransport({
  //   host: "smtp.example.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: "your_username", 
  //     pass: "your_password",
  //   },
  // });
  
  // For testing
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

const sendEmail = async (data) => {
  const { name, email, phone, message } = data;
  
  try {
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "keerthiganthevarasa@gmail.com",
      subject: "New Inquiry from Moduno Website",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
      html: `
        <h2>New Inquiry from Moduno Website</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };

// Example API endpoint (Express.js)
// app.post('/api/contact', async (req, res) => {
//   try {
//     const result = await sendEmail(req.body);
//     if (result.success) {
//       res.status(200).json({ success: true, messageId: result.messageId });
//     } else {
//       res.status(500).json({ success: false, error: result.error });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });
