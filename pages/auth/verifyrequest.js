import { Container, Typography } from '@material-ui/core';

const VerifyMessage = () => {
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
        <Typography variant='h2'>
          This is a custom VerifyMessage page
        </Typography>
      </Container>
    </Container>
  );
};

export default VerifyMessage;
