import { ChakraProvider } from '@chakra-ui/react';
import { FuegoProvider } from '@nandorojo/swr-firestore';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { VFC } from 'react';

import { AuthProvider } from '@/context/Auth';
import { fuego } from '@/utils/firebase';
import { theme } from '@/utils/theme';

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Entrance</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <FuegoProvider fuego={fuego}>
      <ChakraProvider resetCSS theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </FuegoProvider>
  </>
);

export default MyApp;
