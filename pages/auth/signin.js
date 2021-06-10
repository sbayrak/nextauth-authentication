import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Container, TextField, Button } from '@material-ui/core';

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn('credentials', {
      redirect: false,
      callbackUrl: 'http://localhost:3000/about',
      email: email,
      password: password,
    }).then(function (result) {
      console.log(result);
      if (result.error === 'CredentialsSignin') {
        setLoginError(result.error);
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* <label>
          Email
          <input
            name='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Sign in</button> */}

        <TextField
          variant='standard'
          type='text'
          name='Email'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>

        <TextField
          variant='standard'
          type='password'
          name='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>

        <Button type='submit'>Submit</Button>
      </form>
      <br /> <br /> <br />
      {loginError && (
        <Typography variant='h4'>Wrong e-mail or password</Typography>
      )}
    </Container>
  );
}
