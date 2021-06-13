import sgMail from '@sendgrid/mail';

export default async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { email, token } = req.body;

  if (req.method === 'POST') {
    const msg = {
      to: email, // Change to your recipient
      from: process.env.EMAIL_FROM, // Change to your verified sender
      subject: `${process.env.NEXTAUTH_URL} - Password Reset`,
      text: 'password Reset',
      html: `<h1>${process.env.NEXTAUTH_URL}</h1>  <br/> <h3>Password Reset</h3>   <br/> <h4>Please click the link below.</h4>   <br/> <a href=${process.env.NEXTAUTH_URL}/auth/password-change/?email=${email}&token=${token}>Click!</a>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
        res.status(201).json({ success: false });
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({ success: false });
      });
  }
};
