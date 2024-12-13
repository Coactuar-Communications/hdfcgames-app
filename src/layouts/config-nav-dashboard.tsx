import { useState, useEffect } from 'react';
import { getData } from 'src/utils/request';
import { SvgColor } from 'src/components/svg-color';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export function Navbar() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("userId");
      const response = await getData(`auth/${id}`);
      if (response.isSuccess && response.user) {
        const savedGame = response.user.choosegame;
        // console.log(savedGame);
        // alert(savedGame);
        if (savedGame) {
          setSelectedGame(savedGame.toLowerCase());
        }
      }
    };
    fetchUserData();
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
              path: `/${selectedGame}-game`,
              icon: icon('gamings'),
            },
            {
              title: `Live ${selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Game`,
              path: `/${selectedGame}-live-game`,
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


