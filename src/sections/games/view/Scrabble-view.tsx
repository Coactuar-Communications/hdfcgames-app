import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ScrabbleEmbed()  {
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
        {/* <CartIcon totalItems={8} /> */}

        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap-reverse"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
    <iframe
      src="/practicegames/scrabble/index.html"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
      sandbox="allow-scripts allow-same-origin"
      title="Embedded Game"
    />
  </div>
    </Box>
    </DashboardContent>
  )};

//   export default ChessEmbed;
