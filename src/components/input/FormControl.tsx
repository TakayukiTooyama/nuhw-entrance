import type { FormControlProps } from '@chakra-ui/react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import type { FC } from 'react';

type Props = FormControlProps & {
  label: string;
  isInvalid?: boolean;
  errorMessage?: string;
};

export const FormInputWrapper: FC<Props> = ({
  label,
  isInvalid,
  errorMessage,
  children,
  ...props
}) => (
  <FormControl isInvalid={isInvalid} {...props} w="100%">
    <FormLabel fontSize="18px" fontWeight="bold">
      {label}
    </FormLabel>
    {children}
    <FormErrorMessage>{isInvalid && errorMessage}</FormErrorMessage>
  </FormControl>
);
