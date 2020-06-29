import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default () => {

  const [isConnected, setIsConnected] = React.useState(true);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        { isConnected ? <Index/> : <Connection/> }
      </Box>
    </Container>
  );
}

const Index = () => {
  return (
    <div>

    </div>
  )
}

const Connection = () => {
  return (
    <div>

    </div>
  )
}
