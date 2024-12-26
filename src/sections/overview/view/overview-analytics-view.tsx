import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { getData } from 'src/utils/request';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------
interface User {
  id: number;
  name: string;
  email: string;
  choosegame: string;
}
// Updated Player type
interface Player {
  id: string;
  type: string; // Added type property
  name: string;
  game: string;
  score: number;
}
interface PostItemProps {
  id: number;
  title: string;
  description: string;
  path: string;
  coverUrl: string;
  totalViews: number;
  totalShares: number;
}

export function OverviewAnalyticsView() {
  const [allUsersCount, setAllUsersCount] = useState<number>(0);
  const [liveUsersCount, setLiveUsersCount] = useState<number>(0);
  const [loggedInUsersCount, setLoggedInUsersCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [regUsers, setRegUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Move this here
  const usersPerPage = 6;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersResponse = await getData('auth/getallusers');
        const liveUsersResponse = await getData('auth/getliveusers');
        const loggedInUsersResponse = await getData('auth/getloggedinusers');
        const topPlayersResponse = await getData('games/gettoplayers');
        console.log('liveUsersResponse:', liveUsersResponse);
        console.log('loggedInUsersResponse:', loggedInUsersResponse);
        if (usersResponse?.isSuccess && Array.isArray(usersResponse.users)) {
          setRegUsers(usersResponse.users);
          setAllUsersCount(usersResponse.users.length);
        }
        if (liveUsersResponse?.isSuccess && typeof liveUsersResponse.count === 'number') {
          setLiveUsersCount(liveUsersResponse.count);
        }
        if (loggedInUsersResponse?.isSuccess && typeof loggedInUsersResponse.count === 'number') {
          setLoggedInUsersCount(loggedInUsersResponse.count);
        }
        if (topPlayersResponse && Array.isArray(topPlayersResponse.data)) {
          setTopPlayers(topPlayersResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = regUsers.slice(startIndex, endIndex);

  const userList: PostItemProps[] = displayedUsers.map((user) => ({
    id: user.id,
    title: user.name,
    description: `Game: ${user.choosegame} | Email: ${user.email}`,
    path: '#',
    coverUrl: '/assets/avatars/avatar_default.jpg',
    totalViews: Math.floor(Math.random() * 1000),
    totalShares: Math.floor(Math.random() * 100),
  }));

  if (isLoading) {
    return <Typography>Loading data...</Typography>;
  }

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }} color="#ffffff">
        Hi, Welcome 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AnalyticsWidgetSummary
            title="Registered users"
            percent={2.6}
            total={allUsersCount || 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{ categories: [], series: [] }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsWidgetSummary
            title="Logged in users"
            percent={2.6}
            total={loggedInUsersCount || 0}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{ categories: [], series: [] }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsWidgetSummary
            title="Currently Logged in"
            percent={2.6}
            total={liveUsersCount || 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{ categories: [], series: [] }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Overall Top 6 Players" list={topPlayers.slice(0, 6)} />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="Userlist" list={userList} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
    count={Math.ceil(regUsers.length / usersPerPage)}
    page={currentPage}
    onChange={handlePageChange}
    color="primary" // Color scheme (optional)
    sx={{
      '& .MuiPaginationItem-root': {
        color: '#ffffff', // Default color for page numbers
      },
      '& .Mui-selected': {
        color: '#ffffff', // Color of selected number
        backgroundColor: '#1976d2', // Highlight color for the selected page
      },
      '& .MuiPaginationItem-previousNext': {
        color: '#1976d2', // Color of arrows
      },
    }}
  />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

