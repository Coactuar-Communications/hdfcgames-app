import { useState, useEffect } from 'react';
import { SvgColor } from 'src/components/svg-color';

// Define the interface for nav data (as per your existing structure)
interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
  children?: NavItem[];
}

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData: NavItem[] = [
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
    icon: icon('gamings'), // Replace with your icon method
    children: [
      {
        title: 'Practice Games',
        path: '/chessgame',
        icon: icon('gamings'),
      },
      {
        title: 'Live Games',
        path: '/sudoku',
        icon: icon('gamings'),
      },
    ],
  },
  // Other nav items can go here
];

export function Navbar() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Optionally, use localStorage to persist the selection across page reloads
  useEffect(() => {
    const savedGame = localStorage.getItem('choosegame');
    console.log(savedGame);

    if (savedGame) {
      setSelectedGame(savedGame);
    }
  }, []);

  const handleGameSelection = (gameTitle: string) => {
    setSelectedGame(gameTitle);
    localStorage.setItem('chosegame', gameTitle); // Persist selection
  };

  // Modify the navData based on the selected game
  const filteredNavData = navData.map((item) => {
    if (item.children) {
      // Filter children based on selectedGame
      const filteredChildren = selectedGame
        ? item.children.filter((child) => child.title === selectedGame)
        : item.children;

      return {
        ...item,
        children: filteredChildren,
      };
    }
    return item;
  });

  return (
    <nav>
      {filteredNavData.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <ul>
            {item.children?.map((child) => (
              <li key={child.title}>
                <a href={child.path} onClick={() => handleGameSelection(child.title)}>
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
