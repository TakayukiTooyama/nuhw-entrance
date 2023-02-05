import { CalendarIcon, DeleteIcon } from '@chakra-ui/icons';
import type { BoxProps } from '@chakra-ui/react';
import {
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { IoIosSchool } from 'react-icons/io';

import { Card } from '@/components/card';
import { CardTextSchedule } from '@/components/text';
import { formatWeekdayNotation } from '@/utils/format';

type Props = BoxProps & {
  onOpen: () => void;
  data: any;
};

export const ConfirmCard: FC<Props> = ({
  onOpen,
  data,
  children,
  ...props
}) => (
  <Card innerPadding={4} {...props}>
    <Stack mb={4} spacing={1}>
      <Flex alignItems="center" justify="space-between">
        <Heading as="h2" size="lg" isTruncated>
          {data.tournamentName}
        </Heading>
        <IconButton
          bg="red.300"
          aria-label="deleteIcon"
          size="sm"
          shadow="inner"
          icon={<DeleteIcon />}
          onClick={onOpen}
        />
      </Flex>
      <Divider />
      <HStack color="gray.500" align="center" pl={2}>
        <CalendarIcon />
        <CardTextSchedule
          startDate={formatWeekdayNotation(data.startDate)}
          endDate={formatWeekdayNotation(data.endDate)}
        />
      </HStack>
      <HStack spacing={1} color="gray.500" pl={2}>
        <Icon as={IoIosSchool} w={5} h={5} />
        <Text>学年</Text>
        <Text>{data.grade}</Text>
      </HStack>
    </Stack>
    {children}
  </Card>
);
