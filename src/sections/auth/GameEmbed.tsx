const GameEmbed = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <iframe
        src="/games/sudoku/index.html"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin"
        title="Embedded Game"
      ></iframe>
    </div>
  );
};

export default GameEmbed;
