import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import type { VFC } from 'react';
import { useEffect } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { EventInfo } from '@/models/users';

type Props = {
  name: string;
  control: Control<any, object>;
  checkboxOptions: string[];
  setEvents?: React.Dispatch<React.SetStateAction<EventInfo[]>>;
};

export const EventCheckbox: VFC<Props> = ({
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
