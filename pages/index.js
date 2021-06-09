import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Button, Container } from '@material-ui/core';

export default function Index() {
  const [session, loading] = useSession();
  console.log(session);
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
            <Button onClick={signOut}>sign out</Button>
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
