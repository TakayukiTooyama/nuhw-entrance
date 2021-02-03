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
      <Box h="100%">
        <Header prevPageLink={prevPageLink} prevPageTitle={prevPageTitle} />
        <main>{children}</main>
      </Box>
    ) : (
      <Box h="100%">
        <Header />
        <main>{children}</main>
        <TabBar />
      </Box>
    )}
  </>
);

export default Layout;
