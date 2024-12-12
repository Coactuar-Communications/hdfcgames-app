import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ChessEmbed  from 'src/sections/auth/ChessEmbed';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Register - ${CONFIG.appName}`}</title>
      </Helmet>

      <ChessEmbed />
    </>
  );
}