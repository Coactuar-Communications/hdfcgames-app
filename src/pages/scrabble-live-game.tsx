import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ScrabbleLiveEmbed } from 'src/sections/games/view/Scrabble-live-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Games - ${CONFIG.appName}`}</title>
      </Helmet>

      <ScrabbleLiveEmbed />
    </>
  );
}