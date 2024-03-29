import { Box, ButtonGroup, Heading } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import type { VFC } from 'react';

import { Slash } from '@/components/boundary';
import { LinkButton } from '@/components/button';
import { useAuth } from '@/context/Auth';
import type { UserInfo } from '@/models/users';

type Props = {
  title: string;
  linkData?: { label: string; link: string }[];
  adminLink?: string;
};

export const TopHeading: VFC<Props> = ({ title, linkData, adminLink }) => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(
    user ? `users/${user?.uid}` : null
  );
  const router = useRouter();
  const path = router.asPath.split('/')[1];
  const currentPath = router.pathname;

  return (
    <Box bg="gray.200">
      <Box textAlign="center" pt={8} pb={4}>
        <Heading pb={4}>{title}</Heading>
        {currentPath !== '/team/management' && currentPath !== '/profile' && (
          <ButtonGroup w="90%" maxW="md" pb={4}>
            {userInfo?.role === '管理者' && (
              <LinkButton
                label="管理"
                link={path === '' ? '/entry/management' : adminLink}
                currentPage={adminLink === currentPath}
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
