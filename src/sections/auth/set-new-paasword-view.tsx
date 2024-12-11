import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { postData } from 'src/utils/request';
import { validatePassword } from '../../utils/validation';


// ----------------------------------------------------------------------

export function SetNewPwordView() {
  const [userDetails, setUserDetails] = useState({
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = (): boolean => {
    const { password, confirmPassword: confirmPasswordField } = userDetails;
    let valid = true;

    if (!validatePassword(password)) {
      setSnackbar({
        open: true,
        message: 'Password must be at least 8 characters long and can include letters, numbers, and special characters.',
        severity: 'error',
      });
      valid = false;
    }

    if (password !== confirmPasswordField) {
      setSnackbar({ open: true, message: 'Passwords do not match!', severity: 'error' });
      valid = false;
    }

    return valid;
  };

  const handleSubmitNewPword = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(' handleSubmitNewPword triggered'); // Log to check if this function runs

    if (!validateFields()) {
      console.log(' Validation failed');
      return;
    }

    console.log(' Validation passed, attempting to update password...');
    setIsLoading(true);

    try {
      const { password } = userDetails;
      const token = localStorage.getItem('USERTOKEN'); // Get token from local storage
      console.log(' Token from localStorage:', token); // Log token for debugging

      if (!token) {
        console.error(' Token not found in localStorage');
        setSnackbar({ open: true, message: 'Token not found. Please log in again.', severity: 'error' });
        return;
      }

      const response = await postData(
        'auth/updatePassword', 
        { newPassword: password }, 
        'POST'
      );

      console.log('📡 API Response:', response); // Log API response

      if (response.isSuccess) {
        const message = response?.msg ?? 'Password changed successfully!';
        setSnackbar({ open: true, message, severity: 'success' });
        setUserDetails({ password: '', confirmPassword: '' });

        if (response?.user?.token) {
          localStorage.setItem('USERTOKEN', response.user.token); 
        }

        router.push('/login');
      } else {
        const errorMessage = response?.msg ?? 'Failed to update password. Please try again.';
        console.error(' API Error:', errorMessage);
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      }
    } catch (err) {
      console.error('S Error updating password:', err);
      setSnackbar({ open: true, message: 'An error occurred. Please try again later.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Create New Password</Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          name="password"
          label="Create Password"
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
          value={userDetails.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          InputLabelProps={{ shrink: true }}
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} edge="end">
                  <Iconify icon={isConfirmPasswordVisible ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
          value={userDetails.confirmPassword}
          onChange={handleChange}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          onClick={handleSubmitNewPword}
          loading={isLoading}
        >
          Submit New Password
        </LoadingButton>
      </Box>
    </>
  );
}
