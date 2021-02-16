import { Box, BoxProps, Stack } from '@chakra-ui/react';
import {
  CardTextHeading,
  CardTextSchedule,
  CardTextTimeLimit,
} from 'components/text';
import { Entry, Expedition, Tournament } from 'models/users';
import Router from 'next/router';
import React, { FC } from 'react';
import { TiWarning } from 'react-icons/ti';
import { formatTimeLimitNotation, formatWeekdayNotation } from 'utils/format';

type Props = BoxProps & {
  data: Tournament | Entry | Expedition;
  link: string;
};

const TimeLimitCard: FC<Props> = ({ data, link, children, ...props }) => {
  return (
    <Box
      py={4}
      px={4}
      w="100%"
      bg="gray.100"
      shadow="base"
      borderRadius="10px"
      onClick={() => Router.push(link)}
      {...props}
      cursor="pointer"
    >
      <Stack>
        <CardTextSchedule
          startDate={formatWeekdayNotation(data.startDate)}
          endDate={formatWeekdayNotation(data.endDate)}
        />
        <CardTextHeading text={data.tournamentName} />
        {children}
        <CardTextTimeLimit
          icon={TiWarning}
          text={`${formatTimeLimitNotation(data.timeLimit)} まで`}
        />
      </Stack>
    </Box>
  );
};

export default TimeLimitCard;
