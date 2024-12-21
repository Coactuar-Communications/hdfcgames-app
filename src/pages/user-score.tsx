import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserViewScore } from 'src/sections/user/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Leaderboard - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserViewScore />
    </>
  );
}
