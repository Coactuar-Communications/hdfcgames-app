import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; // Import Alert component
import { useRouter } from 'src/routes/hooks';
import { postData } from 'src/utils/request';
import analyt from '../../../public/assets/images/img/logo2.jpg';

// ----------------------------------------------------------------------

export function ForgotPasswordView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'error' | 'info' | 'success' | 'warning' }>({
    open: false,
    message: '',
    severity: 'info', // Default severity
  });
  const [email, setEmail] = useState('');

  // Handler to check if the email exists in the database
  const handleCheckEmail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default form submission

    // Validation before proceeding
    if (!email) {
      setSnackbar({
        open: true,
        message: 'Please enter your email address.',
        severity: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await postData('auth/validateEmail', { email });
      // Call API to check if the email exists

      if (data.isSuccess) {
        setSnackbar({
          open: true,
          message: 'Email found. Redirecting to set new password...',
          severity: 'success',
        });
        router.push('/set-new-pword'); // Redirect to set new password page
      } else {
        setSnackbar({
          open: true,
          message: 'Email not found. Please try again.',
          severity: 'error',
        });
      }
    } catch (err) {
      console.error('Error checking email:', err);
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again later.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Rendering the form with the email input
  const renderForm = (
    <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleCheckEmail}
        loading={isLoading} // Show loading state while request is in progress
        sx={{
          background: '#004b8f',
          color: '#fff',
          '&:hover': {
            background: '#032c51'
          }
        }}
      >
        Verify Email
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
      <img src={analyt} alt="HDFC"
       style={{ width: '200px',  objectFit: 'cover' }} />
        <Typography variant="h5">Forgot Password</Typography>
      </Box>

      {renderForm}

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000} // Automatically hide after 6 seconds
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
