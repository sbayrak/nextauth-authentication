import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Container, TextField, Button } from '@material-ui/core';

export default function SignIn() {
  const router = useRouter();

  const [email2, setEmail2] = useState('');
  const [password2, setPassword2] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   signIn('email', { email: email });
  // };


  const handleRegister = async (e) => {
    e.preventDefault();

    console.log('submitted!');

    const submitData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/profile/verify-email/`, {
      method: 'POST',
      body: JSON.stringify({email: email2, password: password2})
    });

  }

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
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* <form onSubmit={submitHandler}>
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
      </form> */}



      <form onSubmit={handleRegister} style={{marginBottom: '60px'}}>
      <TextField
          variant='standard'
          type='text'
          name='Email'
          label='Email'
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
        ></TextField>
        <TextField
            variant='standard'
            type='password'
            name='Password'
            label='Password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
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
