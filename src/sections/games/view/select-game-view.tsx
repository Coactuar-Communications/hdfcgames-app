import { useEffect, useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Ensure you are using react-router
import { getData } from 'src/utils/request';
import { UserViewScore } from 'src/sections/user/view'; 

export function SelectGamePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("userId"); // Get user ID from localStorage
      const response = await getData(`auth/${id}`); // Call the API to get user info
      if (response.isSuccess && response.user) {
        const savedGame = response.user.choosegame;
        if (savedGame) {
          setSelectedGame(savedGame.toLowerCase());
        }
      }
      setIsLoading(false); // End loading state
    };
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (!selectedGame) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">No game selected. Please register first.</Typography>
      </Box>
    );
  }

  return (
<Box 
      sx={{ 
        minHeight: '91vh', // Ensures it covers the entire viewport height
        backgroundImage: 'url(../../public/assets/images/img/game-bg.jpg)', // Set your image path here
        backgroundSize: 'cover', // Ensures the image covers the entire area
        backgroundPosition: 'left bottom', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        display: 'flex',
        flexDirection: 'column',
        color: '#FFFFFF', // Ensures text is visible on the background
      }}
    >
    <DashboardContent>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start" sx={{ gap: 3 }}>
        {/* Left: Practice and Live Buttons */}
        <Box 
          sx={{ 
            flex: 1, 
            maxWidth: '50%', 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          {/* Chess Image */}
          <img 
            src="../../public/assets/images/img/chess.png" 
            alt="Chess Pieces" 
            style={{ width: '300px', height: 'auto', marginBottom: '20px',marginTop: '100px' }} 
          />
          
          {/* Buttons */}
          <Box sx={{ mt: 'auto', width: '100%', maxWidth: '300px' }}>
            {/* Practice Game Button */}
            <Button 
              variant="contained" 
              color="error" 
              sx={{ mb: 2, width: '100%' }} 
              onClick={() => navigate(`/${selectedGame}-game`)}
            >
              Practice {selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game
            </Button>

            {/* Live Game Button */}
            <Button 
              variant="contained" 
              color="error" 
              sx={{ width: '100%' }} 
              onClick={() => navigate(`/${selectedGame}-live-game`)}
            >
              Live {selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game
            </Button>
          </Box>
        </Box>

        {/* Right: User Scores */}
        <Box sx={{ flex: 1, maxWidth: '50%' }}>
          <UserViewScore />
        </Box>
      </Box>
    </DashboardContent>
    </Box>
  );
}
