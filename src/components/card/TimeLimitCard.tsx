import { DeleteIcon } from '@chakra-ui/icons';
import type { BoxProps } from '@chakra-ui/react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import type { FC } from 'react';

import {
  CardTextHeading,
  CardTextSchedule,
  CardTextTimeLimit,
} from '@/components/text';
import type { Entry, Tournament } from '@/models/users';
import { formatTimeLimitNotation, formatWeekdayNotation } from '@/utils/format';
import { MotionBox } from '@/utils/motion';

type Props = BoxProps & {
  data: Tournament | Entry;
  link: string;
  onOpen?: () => void;
};

export const TimeLimitCard: FC<Props> = ({
  data,
  link,
  children,
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
        justify="space-between"
        align="center"
        h="40px"
        px={4}
        bg="gray.200"
        borderTopLeftRadius="16px"
        borderTopRightRadius="16px"
      >
        <CardTextSchedule
          startDate={formatWeekdayNotation(data.startDate)}
          endDate={formatWeekdayNotation(data.endDate)}
        />
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
        p={4}
        borderBottomRightRadius="16px"
        borderBottomLeftRadius="16px"
      >
        <CardTextHeading text={data.tournamentName} align="center" />
        {children}
        <CardTextTimeLimit
          mt={2}
          justify="center"
          text={`${formatTimeLimitNotation(data.timeLimit)}`}
        />
      </Box>
    </MotionBox>
  );
};
