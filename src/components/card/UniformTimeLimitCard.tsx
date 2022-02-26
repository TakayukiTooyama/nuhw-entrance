import { DeleteIcon } from '@chakra-ui/icons';
import type { BoxProps } from '@chakra-ui/react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import Router, { useRouter } from 'next/router';
import type { VFC } from 'react';

import { CardTextHeading, CardTextTimeLimit } from '@/components/text';
import type { UniformCardInfo } from '@/models/users';
import { formatTimeLimitNotation } from '@/utils/format';
import { MotionBox } from '@/utils/motion';

type Props = BoxProps & {
  text: string;
  data: Document<UniformCardInfo>;
  link: string;
  onOpen?: () => void;
};

export const UniformTimeLimitCard: VFC<Props> = ({
  text,
  data,
  link,
  onOpen,
  ...props
}) => {
  const router = useRouter();
  const path = router.asPath.split('/')[2];

  return (
    <MotionBox
      w="100%"
      shadow="base"
      {...props}
      cursor="pointer"
      pos="relative"
      borderRadius="16px"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Flex
        justify="flex-end"
        align="center"
        h="40px"
        px={4}
        bg="gray.200"
        borderTopLeftRadius="16px"
        borderTopRightRadius="16px"
      >
        {path === 'management' && (
          <IconButton
            aria-label="deleteIcon"
            size="sm"
            bg="none"
            _hover={{ color: 'red.400' }}
            icon={<DeleteIcon />}
            onClick={onOpen}
          />
        )}
      </Flex>
      <Box
        onClick={() => Router.push(link)}
        bg="white"
        p={6}
        borderBottomRightRadius="16px"
        borderBottomLeftRadius="16px"
      >
        <CardTextHeading text={text} align="center" />
        {data.timeLimit > new Date() ? (
          <CardTextTimeLimit
            mt={2}
            justify="center"
            text={`${formatTimeLimitNotation(data.timeLimit)}`}
          />
        ) : (
          <Text color="gray.400" fontWeight="bold" align="center">
            終了しました
          </Text>
        )}
      </Box>
    </MotionBox>
  );
};
