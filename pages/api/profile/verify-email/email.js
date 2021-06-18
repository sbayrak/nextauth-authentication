import sgMail from '@sendgrid/mail';

export default async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_EMAIL_VERIFICATION_KEY);
  const { email, token } = req.body;

  if (req.method === 'POST') {
    const msg = {
      to: email, // Change to your recipient
      from: process.env.EMAIL_FROM, // Change to your verified sender
      subject: `${process.env.NEXTAUTH_URL} - E-Mail Confirmation`,
      text: 'E-mail Confirmation',
      html: `<h1>${process.env.NEXTAUTH_URL}</h1>  <br/> <h3>E-mail Confirmation</h3>   <br/> <h4>Please click the link below.</h4>   <br/> <a href=${process.env.NEXTAUTH_URL}/auth/verify-email?email=${email}&token=${token}>Click!</a>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        res.status(201).json({ success: true });
      })
      .catch((error) => {
        res.status(401).json({ success: false });
      });
  }
};
