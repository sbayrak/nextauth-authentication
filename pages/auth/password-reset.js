import { Container, Typography, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PasswordReset = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!emailIsValid(email)) {
      setError('Please enter a valid e-mail.');
    } else if (emailIsValid(email)) {
      const res = await fetch(
        `${window.location.origin}/api/profile/password-reset/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        }
      );
      const data = await res.json();

      if (!data && data.msg) {
        setError(data.msg);
      } else if (data) {
        const resEmail = await fetch(
          `${window.location.origin}/api/profile/password-reset/email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, token: data[0].token }),
          }
        );
        const dataEmail = await resEmail.json();
        router.push(data[0].callbackUrl);
      }
    }
  };
  return (
    <Container>
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
          This is a custom PasswordReset page
        </Typography>
        <form
          onSubmit={submitHandler}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            label='E-mail'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <Button
            variant='contained'
            type='submit'
            style={{ marginTop: '16px' }}
          >
            Submit
          </Button>
        </form>
        {error && <Typography variant='h6'>{error}</Typography>}

        <Link href='/'>
          <a style={{ marginTop: '30px' }}>Home</a>
        </Link>
      </Container>
    </Container>
  );
};

export default PasswordReset;
