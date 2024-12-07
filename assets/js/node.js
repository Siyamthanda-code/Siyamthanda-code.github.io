const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Set up the email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password',
  },
});

// Set up the subscription endpoint
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  // Validate the email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(email)) {
    // Send a welcome email to the subscriber
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Welcome to Bite Restaurant!',
      text: 'Thank you for subscribing to our mail list! You will receive a 25% discount on your next meal.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.json({ success: false });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ success: true });
      }
    });
  } else {
    res.json({ success: false });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});