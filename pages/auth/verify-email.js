import { Container, Typography } from '@material-ui/core';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const urlQuery = context.query;

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/profile/verify-email?email=${urlQuery.email}&token=${urlQuery.token}`,
    {
      method: 'GET',
    }
  );
  const result = await response.json();

  return {
    props: {
      urlQuery,
      result,
    },
  };
}

const verifyEmail = ({ urlQuery, result }) => {
  //   console.log(urlQuery);
  console.log(result);
  return (
    <>
      <Container>
        {result.msg === true ? (
          <>
            <Typography>Confirmed!</Typography>
            <Link href='/'>
              <a>Go to Login</a>
            </Link>
          </>
        ) : (
          <Typography>error while confirmation of e-mail</Typography>
        )}
      </Container>
    </>
  );
};

export default verifyEmail;
