import { Container } from '@chakra-ui/react';
import { Layout, TopHeading } from 'components/layout';

export const Home = (): JSX.Element => (
  <Layout title="Home">
    <Container maxW="xl">
      <TopHeading title="エントリー" />
    </Container>
  </Layout>
);

export default Home;
