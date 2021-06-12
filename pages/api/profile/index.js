import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const response = await db.collection('users').find({}).toArray();

    res.status(201).json(response);
  } else if (req.method === 'POST') {
    const { email, password } = req.body;
    const response = await db
      .collection('users')
      .find({ email: email, password: password })
      .toArray();

    const user = JSON.stringify(response);
    res.status(201).json(user);
  }
};
