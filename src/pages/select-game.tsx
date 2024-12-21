import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SelectGamePage } from 'src/sections/games/view'; 

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Games - ${CONFIG.appName}`}</title>
      </Helmet>

      <SelectGamePage />
    </>
  );
}