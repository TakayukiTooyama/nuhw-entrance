import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { EventInfo } from 'models/users';
import React, { useEffect, VFC } from 'react';
import { Control, useController } from 'react-hook-form';

type Props = {
  name: string;
  control: Control<any, object>;
  checkboxOptions: string[];
  setEvents?: React.Dispatch<React.SetStateAction<EventInfo[]>>;
};

const EventCheckbox: VFC<Props> = ({
  name,
  control,
  checkboxOptions,
  setEvents,
}) => {
  const {
    field: { ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  useEffect(() => {
    const eventData: EventInfo[] = value?.map((item: string, index: number) => {
      return {
        id: index,
        name: item,
      };
    });
    setEvents && setEvents(eventData);
  }, [value, setEvents]);

  return (
    <CheckboxGroup colorScheme="teal" value={value} {...inputProps}>
      <Stack h="440px" wrap="wrap">
        {checkboxOptions?.map((value) => (
          <Checkbox key={value} value={value} ref={ref}>
            {value}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};

export default EventCheckbox;
