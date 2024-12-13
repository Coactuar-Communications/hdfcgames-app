import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function ChessEmbed()  {
    return (
        <DashboardContent>
        <Typography variant="h4" sx={{ mb: 5 }} color="#ffffff">
          Games
        </Typography>
  
        {/* <CartIcon totalItems={8} /> */}
  
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap-reverse"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
    <div style={{ position: 'relative', width: '100%', height: '600px', backgroundColor: 'blue' }}>
      <iframe
        src="/games/chess/index.html"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-modals"
        title="Embedded Game"
      />
    </div>
    </Box>
    </DashboardContent>
  )};
  
//   export default ChessEmbed;
  