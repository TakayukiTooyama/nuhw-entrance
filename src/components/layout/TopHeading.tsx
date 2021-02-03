import { Box, Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  title: string;
};

const TopHeading: VFC<Props> = ({ title }) => {
  return (
    <Box>
      <Flex>
        <Heading>{title}</Heading>
        <Spacer />
        <HStack>
          <Button>管理</Button>
          <Button>大会一覧</Button>
          <Button>エントリー済</Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default TopHeading;
