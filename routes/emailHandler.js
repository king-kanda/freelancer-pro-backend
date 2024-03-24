import { Router } from 'express';
import { createTransport } from 'nodemailer';

const router = Router();

router.post('/send-invoice', async (req, res) => {
  // Extract the invoice HTML content from the request
  const { invoiceHTML, recipientEmail } = req.body;

  // Create a Nodemailer transporter
  let transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: 'stevenokanda@gmail.com',
      pass: 'okanda@onyango@steven',
    },
  });

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Your Name" <your-email@gmail.com>',
      to: recipientEmail,
      subject: 'Invoice',
      html: invoiceHTML,
    });

    console.log('Message sent: %s', info.messageId);
    res.status(200).send('Invoice sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending invoice');
  }
});

export default router;
