import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('submitted!');
    signIn('credentials', {
      email: email,
      password: password,
      //   email: 'test@test.com',
      //   password: '1234',
      callbackUrl: 'http://localhost:3000/about',
      redirect: false,
    }).then(function (result) {
      console.log(result);
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError(
            'Your username/password combination was incorrect. Please try again'
          );
        } else {
          setLoginError(result.error);
        }
      } else {
        console.log(result);
        router.push(result.url);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          name='email'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type='submit'>Sign in</button>
    </form>
  );
}
