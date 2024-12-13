import { useState, useEffect } from 'react';
import { SvgColor } from 'src/components/svg-color';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export function Navbar() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Load the selected game from localStorage when the component mounts
  useEffect(() => {
    const savedGame = localStorage.getItem('chosegame'); // Get game from localStorage
    if (savedGame) {
      setSelectedGame(savedGame.toLowerCase()); // Convert to lowercase for consistency
    }
  }, []);

  // Generate dynamic paths for Practice and Live Games based on the selected game
  const navData = [
    {
      title: 'Dashboard',
      path: '/',
      icon: icon('ic-analytics'),
    },
    {
      title: 'Leaderboard',
      path: '/user',
      icon: icon('ic-user'),
    },
    {
      title: 'Games',
      path: '/products',
      icon: icon('gamings'),
      children: selectedGame
        ? [
            {
              title: `Practice ${selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game`,
              path: `/${selectedGame}-game`, // Example: /sudoku-game, /scrabble-game
              icon: icon('gamings'),
            },
            {
              title: `Live ${selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game`,
              path: `/${selectedGame}-live-game`, // Example: /sudoku-live-game, /scrabble-live-game
              icon: icon('gamings'),
            },
          ]
        : [], // If no game is selected, no children are shown
    },
  ];

  return (
    <nav>
      {navData.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <ul>
            {item.children?.map((child) => (
              <li key={child.title}>
                <a href={child.path}>
                  {child.icon} {child.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}


