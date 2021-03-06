import { connectToDatabase } from '../../../../util/mongodb';
import { v4 as uuidv4 } from 'uuid';
import sgMail from '@sendgrid/mail';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  sgMail.setApiKey(process.env.SENDGRID_EMAIL_VERIFICATION_KEY);

  const { email, password } = req.body;
  const token = uuidv4();
  const date = new Date();
  const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/verifyrequest`;

  if (req.method === 'POST') {
    const isUserExists = await db.collection('users').findOne({ email });

    if (isUserExists) {
      const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/verifyrequest`;

      res
        .status(201)
        .json({ msg: 'exists', callbackUrl, email: '', token: '' });
      console.log('User exists!');
    } else if (!isUserExists) {
      const newVerificationRequest = await db
        .collection('verificationRequests')
        .insertOne({
          email: req.body.email,
          password: password,
          token,
          callbackUrl,
          madeAt: date.toString(),
        });

      res.status(201).json(newVerificationRequest.ops);
    }
  } else if (req.method === 'GET') {
    const { email, token } = req.query;

    const compare = await db
      .collection('verificationRequests')
      .findOne({ email, token });

    if (!compare) {
      res.status(401).json({ msg: 'Not authorized' });
    } else if (compare) {
      res.status(201).json({ msg: true });

      await db.collection('users').insertOne({
        email,
        password: compare.password,
        madeAt: date.toString(),
      });
      await db
        .collection('verificationRequests')
        .deleteOne({ _id: compare._id });
    }
  }
};
