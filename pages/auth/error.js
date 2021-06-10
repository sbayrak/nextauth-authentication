import { Container, Typography } from '@material-ui/core';

const Error = () => {
  return (
    <Container>
      <Container
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h2'>This is a custom Error page</Typography>
      </Container>
    </Container>
  );
};

export default Error;
