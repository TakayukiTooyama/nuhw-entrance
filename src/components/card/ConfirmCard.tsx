import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Card } from 'components/card';
import { DeleteDialog } from 'components/dialog';
import { CardTextSchedule } from 'components/text';
import React, { FC, useRef } from 'react';
import { formatWeekdayNotation } from 'utils/format';

type Props = BoxProps & {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  data: any;
  onDelete: () => Promise<void>;
};

const ConfirmCard: FC<Props> = ({
  isOpen,
  onClose,
  onOpen,
  data,
  onDelete,
  children,
  ...props
}) => {
  const cancelRef = useRef();

  return (
    <>
      <DeleteDialog
        name={data.tournamentName}
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onDelete={onDelete}
      />
      <Card innerPadding={4} {...props}>
        <Stack>
          <Flex alignItems="center" justify="space-between">
            <Heading as="h2" size="lg" isTruncated>
              {data.tournamentName}
            </Heading>
            <IconButton
              aria-label="deleteIcon"
              bg="red.300"
              shadow="inner"
              icon={<DeleteIcon />}
              onClick={onOpen}
            />
          </Flex>
          <Divider colorScheme="red" />
          <CardTextSchedule
            color="gray.400"
            startDate={formatWeekdayNotation(data.startDate)}
            endDate={formatWeekdayNotation(data.endDate)}
          />
        </Stack>
        <Box mb={6} />
        <Stack spacing={4}>
          <HStack>
            <Text spacing={4}>学年</Text>
            <Text>{data.grade}</Text>
          </HStack>
        </Stack>
        {children}
      </Card>
    </>
  );
};

export default ConfirmCard;
