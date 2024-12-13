import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// import {ChessEmbed} from 'src/sections/games/view';
import {ChessEmbed} from 'src/sections/games/view/ChessEmbed';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Games - ${CONFIG.appName}`}</title>
      </Helmet>

      <ChessEmbed />
    </>
  );
}