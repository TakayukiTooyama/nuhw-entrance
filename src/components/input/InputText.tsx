/* eslint-disable react/no-children-prop */
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = InputProps & {
  placeholder: string;
  rightElement?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText: VFC<Props> = ({ placeholder, rightElement, ...props }) => {
  return (
    <InputGroup>
      <Input placeholder={placeholder} {...props} />
      {rightElement && <InputRightElement children={rightElement} />}
    </InputGroup>
  );
};

export default InputText;
