import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { Event, Uniforms } from 'models/users';
import React, { VFC } from 'react';
import { Control, useController } from 'react-hook-form';

type Props = {
  name: Event & Uniforms;
  control: Control;
  checkboxOptions: string[];
};

const FormCheckbox: VFC<Props> = ({ name, control, checkboxOptions }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <CheckboxGroup colorScheme="teal" {...inputProps}>
      <Stack>
        {checkboxOptions.map((value) => (
          <Checkbox key={value} value={value} ref={ref}>
            {value}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};

export default FormCheckbox;
