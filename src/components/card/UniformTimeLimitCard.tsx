import { DeleteIcon } from '@chakra-ui/icons';
import { Box, BoxProps, Flex, IconButton, Text } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { CardTextHeading, CardTextTimeLimit } from 'components/text';
import { UniformCardInfo } from 'models/users';
import Router, { useRouter } from 'next/router';
import React, { VFC } from 'react';
import { formatWeekdayNotation } from 'utils/format';
import { MotionBox } from 'utils/motion';

type Props = BoxProps & {
  text: string;
  data: Document<UniformCardInfo>;
  link: string;
  onOpen?: () => void;
};

const UniformTimeLimitCard: VFC<Props> = ({
  text,
  data,
  link,
  onOpen,
  ...props
}) => {
  const router = useRouter();
  const path = router.asPath.split('/')[3];

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
            text={`${formatWeekdayNotation(data.timeLimit)}`}
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

export default UniformTimeLimitCard;
