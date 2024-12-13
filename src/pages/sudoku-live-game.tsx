import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SudokuLiveEmbed } from 'src/sections/games/view/Sudoku-live-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Games - ${CONFIG.appName}`}</title>
      </Helmet>

      <SudokuLiveEmbed />
    </>
  );
}