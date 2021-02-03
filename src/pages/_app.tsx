import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'context/Auth';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { VFC } from 'react';
import theme from 'utils/theme';

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Entrance</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  </>
);

export default MyApp;
