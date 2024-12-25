import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { postData } from 'src/utils/request';
import analyt from '../../../public/assets/images/img/logo2.jpg';

export function SignInView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor; // Use AlertColor for valid severity values
  }>({
    open: false,
    message: '',
    severity: 'info', // Default value for severity
  });
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
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
        setSnackbar({ open: true, message, severity: 'success' });
        localStorage.setItem('authToken', data.user.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('choosegame', data.user.choosegame);
  
        const roles = Array.isArray(data.user.roles) ? data.user.roles : [];
        if (roles.includes('Admin') || roles.includes('SuperAdmin')) {
          router.push('/'); // Redirect to Admin/SuperAdmin page
        } else {
          router.push('/select-game'); // Redirect to user page
        }
      } else {
        const errorMessage = data?.msg ?? 'Invalid email or password.';
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      }
    } catch (err: any) {
      console.error('Error signing in:', err);
  
      // Handle 401 explicitly
      if (err.response?.status === 401) {
        setSnackbar({
          open: true,
          message: 'Wrong password',
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'An error occurred. Please try again later.',
          severity: 'error',
        });
      }
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
        helperText={snackbar.message === 'Invalid email format.' ? snackbar.message : ''}
          error={snackbar.severity === 'error' && snackbar.message.includes('Invalid email format')}
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
        sx={{
          background: '#004b8f',
          color: '#fff',
          '&:hover': {
            background: '#032c51'
          }
        }}
      >
        Sign in
      </LoadingButton>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position the Snackbar
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
      <img src={analyt} alt="HDFC"
       style={{ width: '200px',  objectFit: 'cover' }} />
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
