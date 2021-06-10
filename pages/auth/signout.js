import { Container, Typography, Button } from '@material-ui/core';
import Link from 'next/link';

const SignOut = () => {
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
        <Typography variant='h2'>This is a custom SignOut page</Typography>
        <Button variant='contained'>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </Button>
      </Container>
    </Container>
  );
};

export default SignOut;
