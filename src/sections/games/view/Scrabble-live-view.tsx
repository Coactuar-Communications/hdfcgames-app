import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { UserViewScore } from 'src/sections/user/view'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';


export function ScrabbleLiveEmbed() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/select-game'); // Replace '/selectgame' with the actual route for the Select Game page
  };

  return (
    <DashboardContent>
      <Button
        // startIcon={<ArrowBackIcon />}
        variant="contained"
        color="error"
        onClick={handleBack}
       
        sx={{mt:2, mb: 2, width: '10%' }}
 
      >
        Back
</Button>

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
              src="/games/scrabble/index.html"
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
