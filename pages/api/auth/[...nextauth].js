import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../util/mongodb';

const options = {
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Providers.Email({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    // Providers.Auth0({
    //   clientId: process.env.AUTH0_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const res = await fetch('http://localhost:3000/api/profile/', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const user = await res.json();

        // const user = { id: '1', name: 'Suat Bayrak', email: 'test@test.com2' };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  // callbacks: {
  //   async redirect(url, baseUrl) {
  //     console.log(`url is ${url} and baseUrl is ${baseUrl}`);
  //     return `${baseUrl}/about`;
  //   },
  // },
  database: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@nextjs-academia-sb.ki5vd.mongodb.net/test`,
};

export default (req, res) => NextAuth(req, res, options);
