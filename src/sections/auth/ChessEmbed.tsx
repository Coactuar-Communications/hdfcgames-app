const ChessEmbed = () => (
  <div style={{ position: 'relative', width: '100%', height: '500px' }}>
    <iframe
      src="/games/chess/index.html"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
      sandbox="allow-scripts allow-same-origin allow-modals"
      title="Embedded Game"
    />
  </div>
);

export default ChessEmbed;
