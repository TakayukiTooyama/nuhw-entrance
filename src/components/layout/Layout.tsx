import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import type { FC } from 'react';

import { Header } from '@/components/layout';

type Props = {
  title: string;
  prevPageLink?: string;
  prevPageTitle?: string;
};

export const Layout: FC<Props> = ({
  children,
  title,
  prevPageLink,
  prevPageTitle,
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {prevPageLink ? (
      <Box h="100vh">
        <Header prevPageLink={prevPageLink} prevPageTitle={prevPageTitle} />
        <Box as="main" pb="50px">
          {children}
        </Box>
      </Box>
    ) : (
      <Box h="100vh">
        <Header />
        <Box as="main" pb="50px">
          {children}
        </Box>
        {/* <TabBar /> */}
      </Box>
    )}
  </>
);
