import { DeleteIcon } from '@chakra-ui/icons';
import { BoxProps, Flex, IconButton, Stack } from '@chakra-ui/react';
import {
  CardTextHeading,
  CardTextSchedule,
  CardTextTimeLimit,
} from 'components/text';
import { Entry, Expedition, Tournament } from 'models/users';
import Router, { useRouter } from 'next/router';
import React, { FC } from 'react';
import { TiWarning } from 'react-icons/ti';
import { formatTimeLimitNotation, formatWeekdayNotation } from 'utils/format';
import { MotionBox } from 'utils/motion';

type Props = BoxProps & {
  data: Tournament | Entry | Expedition;
  link: string;
  onOpen?: () => void;
};

const TimeLimitCard: FC<Props> = ({
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
      py={4}
      px={4}
      w="100%"
      bg="gray.100"
      shadow="base"
      borderRadius="10px"
      {...props}
      cursor="pointer"
      pos="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Flex justify="space-between" align="center" h="32px">
        <CardTextSchedule
          startDate={formatWeekdayNotation(data.startDate)}
          endDate={formatWeekdayNotation(data.endDate)}
        />
        {path === 'management' && (
          <IconButton
            size="sm"
            aria-label="deleteIcon"
            bg="red.300"
            shadow="inner"
            icon={<DeleteIcon />}
            onClick={onOpen}
          />
        )}
      </Flex>
      <Stack onClick={() => Router.push(link)}>
        <CardTextHeading text={data.tournamentName} />
        {children}
        <CardTextTimeLimit
          icon={TiWarning}
          text={`${formatTimeLimitNotation(data.timeLimit)} まで`}
        />
      </Stack>
    </MotionBox>
  );
};

export default TimeLimitCard;
