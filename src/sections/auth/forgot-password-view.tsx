import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'src/routes/hooks';
import { postData } from 'src/utils/request';
import analyt from '../../../public/assets/images/img/logo2.jpg';

// ----------------------------------------------------------------------

export function ForgotPasswordView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'error' | 'info' | 'success' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });
  const [email, setEmail] = useState('');
  const handleCheckEmail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
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
      if (data.isSuccess) {
        setSnackbar({
          open: true,
          message: 'Email found. Please check email to reset password',
          severity: 'success',
        });
        setEmail('');
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
      setIsLoading(false);
    }
  };
  const renderForm = (
    <Box
      component="form"
      onSubmit={(e) => e.preventDefault()}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
