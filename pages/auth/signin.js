import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  formCredentials: {
    border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
}));

export default function SignIn() {
  const router = useRouter();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    signIn('email', { email: 'suat.bayrak@bilgiedu.net' });
  };

  const handleCredentialsSignIn = async (e) => {
    e.preventDefault();

    signIn('credentials', {
      redirect: false,
      callbackUrl: `${window.location.origin}/about`,
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
    <Container className={classes.container}>
      <form className={classes.formCredentials} onSubmit={handleRegister}>
        <Typography variant='h6'>Register</Typography>
        <label>
          Email address
          <TextField
            variant='standard'
            type='email'
            name='email'
            label='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </label>

        <Button type='submit' variant='outlined' fullWidth>
          Submit
        </Button>
      </form>
      <form
        onSubmit={handleCredentialsSignIn}
        className={classes.formCredentials}
      >
        <Typography variant='h6'>Credentials Sign In</Typography>
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

        <Button type='submit' variant='outlined' fullWidth>
          Submit
        </Button>
      </form>
      <br /> <br /> <br />
      {loginError && (
        <Typography variant='h4'>Wrong e-mail or password</Typography>
      )}
    </Container>
  );
}
