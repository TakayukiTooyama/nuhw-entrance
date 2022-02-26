/* eslint-disable react/no-children-prop */
import type { InputProps } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = InputProps & {
  placeholder: string;
  rightElement?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputText: VFC<Props> = ({
  placeholder,
  rightElement,
  ...props
}) => (
  <InputGroup>
    <Input placeholder={placeholder} {...props} />
    {rightElement && <InputRightElement children={rightElement} />}
  </InputGroup>
);
