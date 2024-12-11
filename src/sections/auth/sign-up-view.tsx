import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Iconify } from 'src/components/iconify';
import { postData } from 'src/utils/request';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select,{ SelectChangeEvent } from '@mui/material/Select';
import analyt from '../../../public/assets/images/img/logo2.jpg';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateContacts,
} from '../../utils/validation';

export function SignUpView() {
  const [userDetails, setUserDetails] = useState({
    employecode:'',
    name: '',
    email: '',
    mobilenumber: '',
    password: '',
    chosegame:'',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confrmPassword, setconfrmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };


  const validateFields = (): boolean => {
    const { name, email, mobilenumber, password, confirmPassword } = userDetails;
    let valid = true;

    if (!validateName(name)) {
      setSnackbar({ open: false, message: 'Name must be at least 3 characters long and contain valid characters.', severity: 'error' });
      valid = false;
    }
    if (!validateEmail(email)) {
      setSnackbar({ open: false, message: 'Invalid email format.', severity: 'error' });
      valid = false;
    }
    // if (!validateContacts(mobilenumber)) {
    //   setSnackbar({ open: false, message: 'Mobile number must be 10 digits.', severity: 'error' });
    //   valid = false;
    // }
    if (!validatePassword(password)) {
      setSnackbar({ open: false, message: 'Password must be at least 8 characters long and can include letters, numbers, and special characters.', severity: 'error' });
      valid = false;
    }
    if (password !== confirmPassword) {
      setSnackbar({ open: false, message: 'Passwords do not match!', severity: 'error' });
      valid = false;
    }
    return valid;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = userDetails;
      const data = await postData('auth/register', payload);
      if (data.isSuccess) {
        const message = data?.msg ?? 'Registration successful!';
        setUserDetails({
          employecode: '',
          name: '',
          email: '',
          mobilenumber: '',
          chosegame:'',
          password: '',
          confirmPassword: '',
        });
        setSnackbar({ open: true, message, severity: 'success' });
      } else {
        const errorMessage = data?.error ?? 'User already exists! Please login with your credentials.';
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      }
    } catch (err) {
      console.error('Error signing up:', err);
      setSnackbar({ open: true, message: 'An error occurred. Please try again later.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };


  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  const handleDropdownChange = (e: SelectChangeEvent<string>) => {
    setUserDetails((prev) => ({ ...prev, chosegame: e.target.value }));
  };
  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
             <img src={analyt} alt="HDFC"
       style={{ width: '200px',  objectFit: 'cover' }}
      />
        <Typography variant="h5">Register for Analytiq 5.0</Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Already registered?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/sign-in">
          Sign In
          </Link>
        </Typography> */}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
          fullWidth
          name="employecode"
          label="Employee Code"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          value={userDetails.employecode}
          onChange={handleChange}
          helperText={snackbar.message === 'Employecode must be at least 3 characters long and contain valid characters.' ? snackbar.message : ''}
          error={snackbar.severity === 'error' && snackbar.message.includes('Employecode')}
        />
        <TextField
          fullWidth
          name="name"
          label="Employee name"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          value={userDetails.name}
          onChange={handleChange}
          helperText={snackbar.message === 'Name must be at least 3 characters long and contain valid characters.' ? snackbar.message : ''}
          error={snackbar.severity === 'error' && snackbar.message.includes('Name')}
        />
        <TextField
          fullWidth
          name="email"
          label="Personal Email ID"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          value={userDetails.email}
          onChange={handleChange}
          helperText={snackbar.message === 'Invalid email format.' ? snackbar.message : ''}
          error={snackbar.severity === 'error' && snackbar.message.includes('Invalid email format')}
        />
        {/* <TextField
          fullWidth
          name="mobilenumber"
          label="Mobile Number"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          value={userDetails.mobilenumber}
          onChange={handleChange}
          helperText={snackbar.message === 'Mobile number must be 10 digits.' ? snackbar.message : ''}
          error={snackbar.severity === 'error' && snackbar.message.includes('Mobile number')}
        /> */}
       <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Choose Game</InputLabel>
          <Select
            name="chosegame"
            value={userDetails.chosegame}
            onChange={handleDropdownChange}
            label="Choose Game"
          >
            <MenuItem value="Scrabble">Scrabble</MenuItem>
            <MenuItem value="Sudoku">Sudoku</MenuItem>
            <MenuItem value="Chess">Chess</MenuItem>
            {/* <MenuItem value="All">All</MenuItem> */}
          </Select>
        </FormControl>
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
          helperText={snackbar.message === 'Password must be at least 8 characters long and can include letters, numbers, and special characters.' ? snackbar.message : ''}
          error={snackbar.severity === 'error' && snackbar.message.includes('Password')}
        />
        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          InputLabelProps={{ shrink: true }}
          type={confrmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setconfrmPassword(!confrmPassword)} edge="end">
                  <Iconify icon={confrmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
          value={userDetails.confirmPassword}
          onChange={handleChange}
          helperText={snackbar.message === 'Passwords do not match!' ? snackbar.message : ''}
          error={snackbar.severity === 'error' && snackbar.message.includes('Passwords do not match')}
        />
  <LoadingButton
  fullWidth
  size="large"
  type="submit"
  variant="contained"
  onClick={handleSignUp}
  loading={isLoading}
  sx={{
    background: '#004b8f',
    color: '#fff',
    '&:hover': {
      background: '#032c51'
    }
  }}
>
  Register
</LoadingButton>
      </Box>
      {/* Snackbar for success and error messages */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
