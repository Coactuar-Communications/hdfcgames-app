import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import React,{ useState, useEffect,forwardRef } from 'react';
// import React, { forwardRef } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { NavUpgrade } from '../components/nav-upgrade';
import { WorkspacesPopover } from '../components/workspaces-popover';

import type { WorkspacesPopoverProps } from '../components/workspaces-popover';

// ----------------------------------------------------------------------
// const RouterLinkWithRef = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
//   <RouterLink ref={ref} {...props} />
// ));
export type NavItem = {
  path: string;
  title: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  children?: NavItem[]; // For dropdowns
};

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usePathname()]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const RouterLinkWithRef = forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <RouterLink ref={ref} {...props} />
  ));
  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  return (
    <>
      <Logo />

      {slots?.topArea}

      <WorkspacesPopover data={workspaces} sx={{ my: 2 }} />

      <Scrollbar fillContent>
      <Box component="ul" gap={0.5} display="flex" flexDirection="column">
      {data.map((item) => (
        <Box key={item.title} component="li">
          <ListItem disableGutters disablePadding>
            <ListItemButton
              disableGutters
              component={RouterLinkWithRef}
              href={!item.children ? item.path || '' : undefined} // Only link if no dropdown
              sx={{
                pl: 2,
                py: 1,
                gap: 2,
                pr: 1.5,
                borderRadius: 0.75,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
                color: 'var(--layout-nav-item-color)',
                minHeight: 'var(--layout-nav-item-height)',
              }}
            >
              <Box component="span" sx={{ width: 24, height: 24 }}>
                {item.icon}
              </Box>
              <Box component="span" flexGrow={1}>
                {item.title}
              </Box>
            </ListItemButton>
          </ListItem>

          {item.children && (
            <Box component="ul" sx={{ pl: 4 }}>
              {item.children.map((child) => (
                <ListItem disableGutters disablePadding key={child.title}>
                  <ListItemButton
                    disableGutters
                    component={RouterLinkWithRef}
                    href={child.path || ''}
                    sx={{
                      pl: 2,
                      py: 1,
                      gap: 2,
                      pr: 1.5,
                      typography: 'body2',
                      color: 'var(--layout-nav-item-color)',
                    }}
                  >
                    <Box component="span" sx={{ width: 24, height: 24 }}>
                      {child.icon}
                    </Box>
                    <Box component="span" flexGrow={1}>
                      {child.title}
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>

        {/* </Box> */}
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}