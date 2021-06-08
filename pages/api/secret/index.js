import { getSession } from 'next-auth/client';

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.status(201).send({
      content: 'welcome to the secret page',
    });
  } else {
    res.status(401).send({
      error: 'you need to sign in',
    });
  }
};
