import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { Container } from '@material-ui/core';
import Link from 'next/link';

const Secret = () => {
  const [session, loading] = useSession();
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/secret');
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);
  return (
    <>
      <Container>
        {loading ? (
          'loading...'
        ) : (
          <>
            {session ? (
              <div>
                protected route : {content} <br />
                <Link href='/'>
                  <a>home page</a>
                </Link>
              </div>
            ) : (
              'you are not signed in'
            )}{' '}
          </>
        )}
      </Container>
    </>
  );
};

export default Secret;
