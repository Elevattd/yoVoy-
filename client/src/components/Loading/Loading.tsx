import { Box, CircularProgress, Container } from '@mui/material';

const Loading = () => {
  console.log('Loading');
  return (
    <Container sx={{ height: '95vh' }}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100%' }}
      >
        <CircularProgress />
      </Box>
    </Container>
  )
}

export default Loading