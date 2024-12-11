import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SetNewPwordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Set New Password - ${CONFIG.appName}`}</title>
      </Helmet>

      <SetNewPwordView />
    </>
  );
}
