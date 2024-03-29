import 'react-datepicker/dist/react-datepicker.css';
import 'dayjs/locale/ja';

import type { ButtonProps } from '@chakra-ui/react';
import { Button, Icon } from '@chakra-ui/react';
import ja from 'date-fns/locale/ja';
import dayjs from 'dayjs';
import type { VFC } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { FcCalendar } from 'react-icons/fc';

import { formatTimeLimitNotation, formatWeekdayNotation } from '@/utils/format';

registerLocale('ja', ja);
dayjs.locale('ja');

type Props = ButtonProps & {
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date;
  endDate?: Date;
  selected: Date;
  showTimeSelect?: boolean;
  onChange: (...event: any[]) => void;
};

export const DatePicker: VFC<Props> = ({
  selectsStart = false,
  selectsEnd = false,
  startDate,
  endDate,
  selected,
  showTimeSelect,
  onChange,
  ...props
}) => {
  // フォーマット変更 → 2020/12/26
  const formatDate = (selected: Date) =>
    showTimeSelect
      ? formatTimeLimitNotation(selected)
      : formatWeekdayNotation(selected);
  return (
    <ReactDatePicker
      locale="ja"
      selected={selected}
      onChange={onChange}
      selectsStart={selectsStart}
      selectsEnd={selectsEnd}
      startDate={startDate}
      endDate={endDate}
      showTimeSelect={showTimeSelect}
      timeIntervals={1}
      minDate={new Date()}
      customInput={
        <Button
          bg="gray.100"
          border="2px solid"
          borderColor="gray.300"
          borderRadius="30px"
          iconSpacing={4}
          rightIcon={<Icon as={FcCalendar} w={6} h={6} />}
          {...props}
        >
          {formatDate(selected)}
        </Button>
      }
    />
  );
};
