import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { postData } from 'src/utils/request';

export function SignInView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const validateSignInFields = () => {
    // Simple validation for empty email and password
    if (!userDetails.email || !userDetails.password) {
      setSnackbar({
        open: true,
        message: 'Please fill in both fields',
        severity: 'error',
      });
      return false;
    }
    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignInFields()) {
      return;
    }
    setIsLoading(true);
    try {
      const { email, password } = userDetails;
      const data = await postData('auth/login', { email, password });

      if (data.isSuccess) {
        const message = data?.msg ?? 'Sign-in successful!';
        setUserDetails({
          email: '',
          password: '',
        });
        setSnackbar({ open: true, message, severity: 'success' });
        localStorage.setItem('token', data.user.token);
        router.push('/');
      } else {
        const errorMessage = data?.error ?? 'Invalid email or password. Please try again.';
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      }
    } catch (err) {
      console.error('Error signing in:', err);
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again later.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={userDetails.email}
        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" href="/forgot-pword" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={userDetails.password}
        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        loading={isLoading}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/sign-up">
            Sign Up
          </Link>
        </Typography>
      </Box>

      {renderForm}
{/* 
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider> */}

      {/* <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box> */}
    </>
  );
}
