import { Container, Typography, TextField, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const urlQuery = context.query;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/profile/password-reset?email=${urlQuery.email}&token=${urlQuery.token}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const PasswordReset = ({ data }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${window.location.origin}/api/profile/password-reset?email=${router.query.email}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      }
    );
    const data = await response.json();

    if (!data) {
      setError(
        'Oops! Something wrong happened. Please try again or contact us.'
      );
    } else if (data) {
      setShowSignIn(true);
    }
  };

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h6' gutterBottom paragraph>
        This is a custom PasswordChange page
      </Typography>
      {data.msg === 'ok' ? (
        <>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '24px',
            }}
            onSubmit={handleChangePassword}
          >
            <TextField
              label='Password'
              name='password'
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <TextField
              label='Password Again'
              name='password'
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <Button
              variant='contained'
              type='submit'
              style={{ marginTop: '16px' }}
            >
              Submit
            </Button>
          </form>
          {error && (
            <Typography variant='h6'>
              Oops! Something went wrong. Please check your e-mail again or
              contact us.
            </Typography>
          )}
          {showSignIn && (
            <>
              <Typography variant='h6'>Success! now you can login</Typography>
              <Button variant='contained' onClick={signIn}>
                Sign In
              </Button>
            </>
          )}
        </>
      ) : (
        <Typography variant='h6'>
          Oops! Something went wrong. Please check your e-mail again or contact
          us.
        </Typography>
      )}

      <Link href='/'>
        <a style={{ marginTop: '30px' }}>Home</a>
      </Link>
    </Container>
  );
};

export default PasswordReset;
