import { HStack, Stack } from '@chakra-ui/react';
import { DatePicker } from 'components/datepicker';
import { InputNumber, InputPinNumber } from 'components/input';
import React, { VFC } from 'react';

type Props = {
  turn: string;
  busNumber: string;
  departureTime: Date;
  capacity: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setBusNumber: React.Dispatch<React.SetStateAction<string>>;
  setDepartureTime: React.Dispatch<React.SetStateAction<Date>>;
  setCapacity: React.Dispatch<React.SetStateAction<string>>;
};

const CreateBusInfo: VFC<Props> = ({
  turn,
  busNumber,
  departureTime,
  capacity,
  setTurn,
  setBusNumber,
  setDepartureTime,
  setCapacity,
}) => {
  return (
    <Stack spacing={4} align="center">
      <HStack spacing={4}>
        <InputPinNumber value={turn} unit="便" setValue={setTurn} />
        <InputPinNumber value={busNumber} unit="号車" setValue={setBusNumber} />
      </HStack>
      <DatePicker
        selected={departureTime}
        onChange={(date: Date) => setDepartureTime(date)}
        showTimeSelect
      />
      <InputNumber
        maxW="170px"
        value={capacity}
        label="定員"
        unit="人"
        setValue={setCapacity}
      />
    </Stack>
  );
};

export default CreateBusInfo;
