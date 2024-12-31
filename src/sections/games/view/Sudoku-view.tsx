import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export function SudokuEmbed() {
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

      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          <iframe
            src="https://games.coact.live/analytiq5/practicegames/sudoku/index.html"
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
