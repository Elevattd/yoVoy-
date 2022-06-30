import React, { useEffect } from 'react'
import { Box, CircularProgress, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuthFetched, selectCurrentToken } from '../../slices/authentication/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
const LoadingAuth = () => {
  const currentToken = useSelector(selectCurrentToken);
  const authFetched = useSelector(selectAuthFetched)
  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    if (currentToken) return navigate(from, { replace: true })
    if (authFetched) return navigate('/login', {replace: true})
  }, [currentToken, authFetched])
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

export default LoadingAuth