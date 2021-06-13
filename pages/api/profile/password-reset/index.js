import { connectToDatabase } from '../../../../util/mongodb';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const token = uuidv4();
  const { email } = req.body;
  const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/verifyrequest`;

  if (req.method === 'POST') {
    const date = new Date();

    try {
      const response = await db.collection('verificationRequests').insertOne({
        token,
        email,
        callbackUrl,
        madeAt: date.toString(),
      });

      res.status(201).json(response.ops);
    } catch (error) {
      res.status(400).json({
        msg: 'Oops! Something wrong happened. Please try again or contact us.',
      });
    }
  } else if (req.method === 'GET') {
    const { email, token } = req.query;

    const compareToken = await db.collection('verificationRequests').findOne({
      email,
      token,
    });
    if (compareToken) {
      await db
        .collection('verificationRequests')
        .deleteOne({ _id: compareToken._id });
      res.status(201).json({ msg: 'ok' });
    } else if (!compareToken) {
      res.status(400).json({
        msg: 'Oops! Something wrong happened. Please try again or contact us.',
      });
    }
  } else if (req.method === 'PATCH') {
    const { password } = req.body;
    const { email } = req.query;

    try {
      const response = await db.collection('users').findOne({ email });
      const updateDocument = {
        $set: {
          password: password,
        },
      };
      const result = await db
        .collection('users')
        .updateOne(response, updateDocument);

      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({
        msg: 'Oops! Something wrong happened. Please try again or contact us.',
      });
    }
  }
};
