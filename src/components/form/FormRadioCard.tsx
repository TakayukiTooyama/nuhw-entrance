import { HStack, useRadioGroup } from '@chakra-ui/react';
import { RadioCard } from 'components/card';
import { VFC } from 'react';

type Props = {
  name: string;
  options: string[];
};

const FormRadioCard: VFC<Props> = ({ options, name }) => {
  const { getRadioProps } = useRadioGroup({
    name,
    defaultValue: options[0],
  });

  return (
    <HStack>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default FormRadioCard;
