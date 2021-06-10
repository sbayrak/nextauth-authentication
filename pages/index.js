import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Button, Container } from '@material-ui/core';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  const [session, loading] = useSession();
  console.log(session);

  const signOutHandler = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: 'http://localhost:3000/auth/signout',
    });
    router.push(data.url);
  };
  return (
    <>
      <Container
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!session ? (
          <>
            Not signed in
            <Button onClick={signIn}>Sign In</Button>
          </>
        ) : loading ? (
          <>loading</>
        ) : (
          <>
            Signed in as {session.user.email}
            <div>now you can access protected routes</div>
            <Button onClick={signOutHandler}>sign out</Button>
            <Link href='/secret'>
              <a>Secret page</a>
            </Link>
            <Link href='/about'>
              <a>about page</a>
            </Link>
          </>
        )}
      </Container>
    </>
  );
}
