import type { InputProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import type { FC } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { useController } from 'react-hook-form';

type Props = InputProps & {
  name: string;
  label?: string;
  control: Control<any, object>;
  errors: FieldErrors;
};

export const FormText: FC<Props> = ({
  label,
  name,
  control,
  errors,
  children,
  ...props
}) => {
  const {
    field: { ref, ...inputProps },
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
