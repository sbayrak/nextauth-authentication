import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import nodemailer from 'nodemailer';

// @@@@@@@@@@@@@@ TODO @@@@@@@@@@@@@@
// EDIT HTML EMAIL TEMPLATE
const html = ({ url, site, email }) => {
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;
  const escapedSite = `${site.replace(/\./g, '&#8203;.')}`;

  const backgroundColor = '#f9f9f9';
  const textColor = '#444444';
  const mainBackgroundColor = '#ffffff';
  const buttonBackgroundColor = '#346df1';
  const buttonBorderColor = '#346df1';
  const buttonTextColor = '#ffffff';

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedSite}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in2</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
};

const text = ({ url, site }) => `Sign in to ${site}\n${url}\n\n`;
const options = {
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: ({
        identifier: email,
        url,
        token,
        baseUrl,
        provider,
      }) => {
        return new Promise((resolve, reject) => {
          const { server, from } = provider;
          const site = baseUrl.replace(/^https?:\/\//, '');

          nodemailer.createTransport(server).sendMail(
            {
              to: email,
              from,
              subject: `Sign in to ${site}`,
              text: text({ url, site, email }),
              html: html({ url, site, email }),
            },
            (error) => {
              if (error) {
                logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error);
                return reject(
                  new Error('SEND_VERIFICATION_EMAIL_ERROR', error)
                );
              }
              return resolve();
            }
          );
        });
      },
    }),
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
        let user;

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const arrayToJson = await res.json();
        user = arrayToJson[0];

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verifyrequest', // (used for check email message)
    newUser: '/auth/newuser', // If set, new users will be directed here on first sign in
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn(user) {
      return user.userId && user.isActive === '1';
    },
    //   async signIn(user, account, profile) {
    //     if (user.userId && user.isActive === '1') {
    //       return true;
    //     } else {
    //       // Return false to display a default error message
    //       return '/auth/error';
    //       // Or you can return a URL to redirect to:
    //       // return '/unauthorized'
    //     }
    //   },
    async session(session, token) {
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (user) token.user = user;
      return token;
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  database: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@nextjs-academia-sb.ki5vd.mongodb.net/test?retryWrites=true&w=majority`,
};

export default (req, res) => NextAuth(req, res, options);
