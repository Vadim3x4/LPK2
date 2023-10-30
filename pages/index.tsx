import * as React from 'react';

import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';

export default function Home() {
  const theme = useTheme();
  const isMatchLg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <main>
      <Head>
        <title>Lintu - main page</title>
      </Head>

      {isMatchLg && <Container maxWidth="lg"></Container>}
      <Container maxWidth="sm"></Container>
    </main>
  );
}
