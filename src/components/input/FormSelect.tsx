import type { SelectProps } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Select, Stack, Text } from '@chakra-ui/react';
import type { VFC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

type Props = SelectProps & {
  gender: string;
  name: string;
  label: string;
  selectOptions: string[];
  control: Control<any, object>;
};

export const FormSelect: VFC<Props> = ({
  gender,
  placeholder,
  name,
  label,
  selectOptions,
  control,
  ...props
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  const isPants =
    label === 'ランパン' ||
    label === 'ランパン(紺色)' ||
    label === 'タイツ(白)' ||
    label === 'タイツ(紺ピンク)' ||
    label === 'セパレートショーツ';

  const isShirt =
    label === 'セパレートトップ' || (gender === '女' && label === 'ランシャツ');

  const isNotRequired = label === 'ハーフパンツ' || isPants || isShirt;

  return (
    <Stack>
      <Flex direction="column" justify="center" align="center">
        <Text ml={1} fontSize={['16px', '18px']} fontWeight="bold">
          {label}
        </Text>
        {!isNotRequired && (
          <Text fontSize="12px" color="red" fontWeight="bold">
            【必須】
          </Text>
        )}
        {isPants && (
          <Text fontSize="12px" color="gray.500" fontWeight="bold">
            【どれか必須】
          </Text>
        )}
        {isShirt && (
          <Text fontSize="12px" color="green.500" fontWeight="bold">
            【どれか必須】
          </Text>
        )}
      </Flex>
      <Select
        bg="white"
        size="lg"
        placeholder={placeholder}
        ref={ref}
        {...inputProps}
        {...props}
      >
        {selectOptions?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Stack>
  );
};
