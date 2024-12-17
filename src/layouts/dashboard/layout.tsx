import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState,useEffect } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { getData } from 'src/utils/request';
import { _langs, _notifications } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
// import { navData } from '../config-nav-dashboard';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../config-nav-workspace';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';
import { LanguagePopover } from '../components/language-popover';
import { NotificationsPopover } from '../components/notifications-popover';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Load the selected game from localStorage when the component mounts
  // useEffect(() => {
  //   const savedGame = localStorage.getItem('chosegame'); // Get game from localStorage
  //   if (savedGame) {
  //     setSelectedGame(savedGame.toLowerCase()); // Convert to lowercase for consistency
  //   }
  // }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("userId");
      const response = await getData(`auth/${id}`);
      if (response.isSuccess && response.user) {
        const savedGame = response.user.choosegame;
        // console.log(savedGame);
        // alert(savedGame);
        if (savedGame) {
          setSelectedGame(savedGame.toLowerCase());
        }
      }
    };
    fetchUserData();
  }, []);
const icon = (name: string) => (
  <img src={`/assets/icons/navbar/${name}.svg`} alt={`${name} icon`} style={{ width: '100%', height: '100%' }} />
);


  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';
  const navData = [
    {
      title: 'Dashboard',
      path: '/',
      icon: icon('chart-histogram'),
      
    },
    {
      title: 'Leaderboard',
      path: '/user',
      icon: icon('user'),
    },
    {
      title: 'Games',
      path: '/products',
      icon: icon('console-controller'),

      children: selectedGame
        ? [
            {
              title: `Practice ${selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game`,
              path: `/${selectedGame}-game`, // Example: /sudoku-game, /scrabble-game
              icon: icon('game-console-crank-handheld'),
            },
            {
              title: `Live ${selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game`,
              path: `/${selectedGame}-live-game`, // Example: /sudoku-live-game, /scrabble-live-game
              icon: icon('joystick'),

            },
          ]
        : [], // If no game is selected, no children are shown
    },
  ];


  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <Searchbar />
                {/* <LanguagePopover data={_langs} /> */}
                {/* <NotificationsPopover data={_notifications} /> */}
                <AccountPopover
                  data={[
                    {
                      label: 'Home',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                    // {
                    //   label: 'Profile',
                    //   href: '#',
                    //   icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    // },
                    // {
                    //   label: 'Settings',
                    //   href: '#',
                    //   icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                    // },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        '&::before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          // opacity: 0.24,
          position: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: `url(/assets/background/bg.jpg)`,
          // [stylesMode.dark]: { opacity: 0.08 },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
