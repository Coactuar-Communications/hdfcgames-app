import { useState, useEffect, useCallback } from 'react';
import { getData, postData } from 'src/utils/request';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { useRouter, usePathname } from 'src/routes/hooks';

// Define AccountPopoverProps type
export type AccountPopoverProps = {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
  username?: string;
  email?: string;
  sx?: object;
};

export function AccountPopover({ data = [], username = 'User', email = 'user@example.com', sx, ...other }: AccountPopoverProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  // Use username and email props directly; fetch user data if needed.
  const [fetchedUsername, setFetchedUsername] = useState<string>(username);
  const [fetchedEmail, setFetchedEmail] = useState<string>(email);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      router.push(path);
    },
    [handleClosePopover, router]
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem('userId');
      if (!id) return;

      const response = await getData(`auth/${id}`);
      if (response.isSuccess && response.user) {
        setFetchedUsername(response.user.name);
        setFetchedEmail(response.user.email);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const response = await postData('auth/logout', { userId }, 'POST');
      if (response.isSuccess) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        router.push('/sign-in');
      } else {
        console.error('Logout failed:', response.msg);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: '2px',
          width: 40,
          height: 40,
          background: (theme) =>
            `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
          ...sx,
        }}
        {...other}
      >
        <Avatar src="" alt={fetchedUsername} sx={{ width: 1, height: 1 }}>
          {fetchedUsername.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {fetchedUsername}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {fetchedEmail}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              [`&.${menuItemClasses.selected}`]: {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option: { label: string; href: string; icon?: React.ReactNode; info?: React.ReactNode }) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color="error" size="medium" variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
}
