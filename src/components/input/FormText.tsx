import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import React, { FC } from 'react';
import { Control, FieldErrors, useController } from 'react-hook-form';

type Props = InputProps & {
  name: string;
  label?: string;
  control: Control<any, object>;
  errors: FieldErrors;
};

const FormText: FC<Props> = ({
  label,
  name,
  control,
  errors,
  children,
  ...props
}) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, isTouched },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormControl isInvalid={invalid && isTouched}>
      {label && (
        <FormLabel htmlFor={name} fontSize="18px" fontWeight="bold">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Input name={name} ref={ref} {...inputProps} {...props} />
        {children}
      </InputGroup>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
      />
    </FormControl>
  );
};

export default FormText;
