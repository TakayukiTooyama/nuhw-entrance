import { Container } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import type { NextPage } from 'next';

import { Layout, TabBar, TopHeading } from '@/components/layout';
import { ProfileChangeForm } from '@/components/template';
import { useAuth } from '@/context/Auth';
import type { User } from '@/models/users';

const Profile: NextPage = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<User>(
    user ? `users/${user.uid}` : null
  );
  return (
    <Layout title="プロフィール設定">
      <TopHeading title="プロフィール設定" />
      <Container maxW="lg" py={8}>
        {userInfo && <ProfileChangeForm userInfo={userInfo} />}
      </Container>
      <TabBar />
    </Layout>
  );
};

export default Profile;
