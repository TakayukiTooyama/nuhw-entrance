import { Box } from '@chakra-ui/react';
import { Header, TabBar } from 'components/layout';
import Head from 'next/head';
import React, { FC } from 'react';

type Props = {
  title: string;
  prevPageLink?: string;
  prevPageTitle?: string;
};

const Layout: FC<Props> = ({
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
        <TabBar />
      </Box>
    )}
  </>
);

export default Layout;
