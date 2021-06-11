import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Container, TextField, Button } from '@material-ui/core';

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    signIn('email', { email: email });
  };

  const handleCredentialsSignIn = async (e) => {
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
        flexDirection: 'column',
      }}
    >
      {/* 
      
      <form onSubmit={submitHandler}>
        <label>
          Email
          <input
            type='text'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit'>submit</button>
        </label>
      </form>
      */}
      <form onSubmit={handleRegister}>
        <TextField
          variant='standard'
          type='text'
          name='email'
          label='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>

        <Button type='submit'>Submit</Button>
      </form>
      <form onSubmit={handleCredentialsSignIn}>
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
