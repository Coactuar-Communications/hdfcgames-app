import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserViewScore } from 'src/sections/user/view'; // Adjust path if needed

export function SudokuLiveEmbed() {
  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }} color="#ffffff">
        Games
      </Typography>

      {/* Flexbox container for the game and leaderboard */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ gap: 3 }}
      >
        {/* Left: Embedded Game */}

          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <iframe
              src="/games/sudoku/index.html"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              sandbox="allow-scripts allow-same-origin"
              title="Embedded Game"
            />
          </div>

      </Box>
    </DashboardContent>
  );
}
