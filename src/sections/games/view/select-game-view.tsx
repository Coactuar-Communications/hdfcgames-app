import { useEffect, useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { getData } from 'src/utils/request';
import { UserViewScore } from 'src/sections/user/view';
import analyt from '../../../assets/images/img/logo2.jpg';

const sudokuGuidelines = `
• Once you enter the sudoku game, you will see a 9x9 grid containing 9 (3x3) boxes. Some squares will already contain numbers.
• User should only use numbers 1 to 9. Use each number once in each row, column & grid.
• Avoid trying to guess the solution. Use the process of elimination as a tactic.
• You can change your answer up to 4 times in each cell, so please play carefully.
• To complete the sudoku puzzle game, you must fill every square on the grid.
• Each user gets three hint options in Sudoku & each hint used will add a penalty of time (5 secs) to the total score.
`;

const chessGuidelines = `
Guidelines for Chess:

1. Once you select Chess, a 10-minute timer starts running. The participant must complete the game within the given time duration.
2. In case of Checkmate, the system directly submits the score; you need to click on Exit.

3. Chess Moves:
        • King can move exactly one square horizontally, vertically, or diagonally. At most once in every game, each king is allowed to make a special move, known as castling.
        • Queen can move any number of vacant squares diagonally, horizontally, or vertically.
        • Rook can move any number of vacant squares vertically or horizontally. It also moves during castling.
        • Bishop can move any number of vacant squares in any diagonal direction.
        • Knight can move one square along any rank or file and then at an angle. The knight's movement can also be viewed as an “L” or “7” laid out at any horizontal or vertical angle.
        • Pawns can move forward one square if that square is unoccupied. If it has not yet moved, the pawn has the option of moving two squares forward provided both squares in front of the pawn are unoccupied. A pawn cannot move backward. Pawns are the only pieces that capture differently from how they move. They can capture an enemy piece on either of the two spaces adjacent to the space in front of them (i.e., the two squares diagonally in front of them) but cannot move to these spaces if they are vacant.
`;
const scrabbleGuidelines = `
Guidelines for Scrabble:

• Once you enter the Scrabble game, you will see a jumbled word. Participants need to rearrange alphabets and identify the correct word.
• Ensure to input words in CAPITALS Only.
• Each participant has to solve 20 words and 5 points for solving each word.
• Once Participants solves all the words, the system will submit the entry.
• Shuffle: This option will rearrange the alphabets (No Change in Score).
• Skip: Will skip the word and will give a new word at a penalty of Minus 5 from Total points.

Quick Tips:
• Look at the words backwards and forward - This helps you see the word in a different way. Example: SDROW is just WORDS backwards.
• Write the letters down on a piece of paper and place words that go with each other next to each other and see what clicks.
• Say the letters out loud. Sometimes reading letters out loud triggers something...
• Experiment with the letters by quickly writing them down in a different order. For example, elzzup might not be recognizable right away, but once rearranged like 'puzzle', it becomes clear.
`;
const sudokuPointSystem = `
Sudoku Scoring Rules

1. Base Score:
   • The score starts with a base value determined by the difficulty level of the puzzle.

2. Time-Based Adjustment:
   • The time taken to complete the puzzle reduces the score. The penalty rate increases with higher difficulty levels.

3. Hints/Auto-Solvers Penalty:
   • Using hints or auto-solvers incurs a penalty, with greater deductions for more assistance.

4. Bonus Time Completion:
   • Completing the puzzle within a predefined bonus time for each difficulty level awards extra points.

5. Final Score Calculation:
   • The final score is a combination of the base score, deductions for time taken and assistance used, and any bonus for timely completion.
`;
const chessPointSystem = `
Chess Game Point System
1. Initial Score:
   • Every player begins with a score of 5000 points.

2. Time-Based Deduction:
   • The score decreases at a rate of 10 points per second as the game progresses.

3. Duration Impact:
   • The longer the game duration, the greater the deduction from the initial score.

4. Final Score Calculation:
   • The final score is determined by subtracting the time-based deductions from the initial score: Final Score=5000−(10×Game Duration in Seconds)

5. Adjustments for Game Mechanics:
   • Additional adjustments may be applied based on specific game mechanics or events, such as bonuses, penalties, or achievements during the game.

`;
const scrabblePointSystem = `
1. Letter Values:

   • 1 point: A, E, I, L, N, O, R, S, T, U
   • 2 points: D, G
   • 3 points: B, C, M, P
   • 4 points: F, H, V, W, Y
   • 5 points: K
   • 8 points: J, X
   • 10 points: Q, Z



2. Scoring Rationale:
The scoring system is designed to balance the frequency of letters in the language with their difficulty of use:

   • Common letters (like E, A, I, O) are worth less points because they're easier to play.
   • Rare letters (like Q, Z, J, X) are worth more points because they're harder to use in words.



3. Word Score Calculation:
To calculate a word's base score, you sum the points of each letter in the word. For example:

   • "SCRABBLE" = (S:1 + C:3 + R:1 + A:1 + B:3 + B:3 + L:1 + E:1) = 14 points



4. Additional Scoring Factors (not shown in this simplified code):

   • Bonus squares: The actual game board has bonus squares that can multiply letter or word scores.
   • Word length bonuses: In many versions, using all 7 tiles from your rack gives a 50-point bonus.



5. Strategic Implications:

   • High-value letters (Q, Z, J, X) can significantly boost your score but are harder to place.
   • Efficient use of low-value letters is crucial for consistent scoring.
   • Placing high-value letters on bonus squares can lead to very high-scoring plays.



6. Blank Tiles:
The code doesn't explicitly show blank tiles, but in standard Scrabble:

   • Blank tiles can represent any letter but are worth 0 points.
   • They're valuable for flexibility but don't contribute to the score directly.
`;


export function SelectGamePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("userId");
      const response = await getData(`auth/${id}`);
      if (response.isSuccess && response.user) {
        const savedGame = response.user.choosegame;
        if (savedGame) {
          setSelectedGame(savedGame.toLowerCase());
        }
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, []);
  

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalOpen1 = () => setIsModalOpen1(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalClose1 = () => setIsModalOpen1(false);

  const getGuidelines = () => {
    if (selectedGame === 'sudoku') return sudokuGuidelines;
    if (selectedGame === 'chess') return chessGuidelines;
    if (selectedGame === 'scrabble') return scrabbleGuidelines;
    return 'No guidelines available.';
  };

  const getPointSystem = () => {
    if (selectedGame === 'sudoku') return sudokuPointSystem;
    if (selectedGame === 'chess') return chessPointSystem;
    if (selectedGame === 'scrabble') return scrabblePointSystem;
    return 'No guidelines available.';
  };
  
  

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
        minHeight: '91vh',
        backgroundImage: 'url(/assets/images/img/game-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        color: '#FFFFFF',
      }}
    >
      <DashboardContent>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={6} textAlign="center">
  <Box sx={{ position: 'relative', maxWidth: '300px', mx: 'auto' }}>
    <img
      src={
        selectedGame === 'sudoku'
          ? '/assets/images/img/sudoku.png'
          : selectedGame === 'chess'
          ? '/assets/images/img/chess.png'
          : '/assets/images/img/scrabble.png'
      }
      alt={
        selectedGame === 'sudoku'
          ? 'Sudoku board'
          : selectedGame === 'chess'
          ? 'Chess pieces'
          : 'Scrabble board'
      }
      style={{
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
        marginBottom: '20px',
        marginTop: '100px',
      }}
    />
    {/* Logo positioned on top of the image */}
    <img
      src={analyt} // Replace with your logo path
      alt="Game Logo"
      style={{
        position: 'absolute',
        top: '10px', // Adjust the position as needed
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%', // Adjust size as needed
      }}
    />
  </Box>
  <Box sx={{ mt: 'auto', maxWidth: '300px', mx: 'auto' }}>
    <Button
      variant="contained"
      color="error"
      sx={{ mb: 2, width: '100%' }}
      onClick={() => navigate(`/${selectedGame}-game`)}
    >
      Practice {selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game
    </Button>
    <Button
      variant="contained"
      color="error"
      sx={{ mb: 2, width: '100%' }}
      onClick={() => navigate(`/${selectedGame}-live-game`)}
    >
      Live {selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game
    </Button>
    <Button
      variant="contained"
      color="error"
      sx={{ mb: 2, width: '100%' }}
      onClick={handleModalOpen}
    >
      Game rules
    </Button>
    <Button
      variant="contained"
      color="error"
      sx={{ width: '100%' }}
      onClick={handleModalOpen1}
    >
      Point system
    </Button>
  </Box>
</Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <UserViewScore />
          </Grid>
        </Grid>
      </DashboardContent>
      {/* Modals */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" gutterBottom>
            Rules and Guidelines
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {getGuidelines()}
          </Typography>
          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleModalClose}>
            Agree
          </Button>
        </Box>
      </Modal>
      <Modal open={isModalOpen1} onClose={handleModalClose1}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" gutterBottom>
            Point System
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {getPointSystem()}
          </Typography>
          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleModalClose1}>
            Ok
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '50%' },
  maxHeight: '90vh', // Ensure the modal doesn't exceed 90% of the viewport height
  overflowY: 'auto', // Enable vertical scrolling when content overflows
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

