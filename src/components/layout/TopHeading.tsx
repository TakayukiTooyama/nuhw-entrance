import { Box, ButtonGroup, Heading } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import { Slash } from 'components/boundary';
import { LinkButton } from 'components/button';
import { useAuth } from 'context/Auth';
import { UserInfo } from 'models/users';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';

type Props = {
  title: string;
  linkData?: { label: string; link: string }[];
};

const TopHeading: VFC<Props> = ({ title, linkData }) => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(`users/${user?.uid}`);
  const router = useRouter();
  const path = router.asPath.split('/')[1];
  const currentPath = router.pathname;

  return (
    <Box bg="gray.200">
      <Box align="center" pt={8} pb={4}>
        <Heading pb={4}>{title}</Heading>
        {currentPath !== '/team/management' && (
          <ButtonGroup w="90%" maxW="md">
            {userInfo?.role === '管理者' && (
              <LinkButton
                label="管理"
                link={path === '' ? '/entry/management' : `/${path}/management`}
                currentPage={`/${path}/management` === currentPath}
              />
            )}
            {linkData?.map((item) => (
              <LinkButton
                key={item.label}
                label={item.label}
                link={item.link}
                currentPage={item.link === currentPath}
              />
            ))}
          </ButtonGroup>
        )}
      </Box>
      <Slash />
    </Box>
  );
};

export default TopHeading;
