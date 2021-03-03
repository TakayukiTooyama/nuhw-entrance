import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = FormControlProps & {
  label: string;
  isInvalid?: boolean;
  errorMessage?: string;
};

const FormInputWrapper: FC<Props> = ({
  label,
  isInvalid,
  errorMessage,
  children,
  ...props
}) => {
  return (
    <FormControl isInvalid={isInvalid} {...props} w="100%">
      <FormLabel fontWeight="bold">{label}</FormLabel>
      {children}
      <FormErrorMessage>{isInvalid && errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInputWrapper;
