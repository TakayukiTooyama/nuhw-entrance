import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import React, { VFC } from 'react';
import { Control, FieldErrors, useController } from 'react-hook-form';

type Props = InputProps & {
  name: string;
  label: string;
  control: Control;
  errors: FieldErrors;
};

const FormText: VFC<Props> = ({ label, name, control, errors, ...props }) => {
  const {
    field: { ref, ...inputProps },
    meta: { invalid, isTouched },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormControl isInvalid={invalid && isTouched}>
      <FormLabel htmlFor={name} fontSize="20px" fontWeight="bold">
        {label}
      </FormLabel>
      <Input name={name} ref={ref} {...inputProps} {...props} />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
      />
    </FormControl>
  );
};

export default FormText;
