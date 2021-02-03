import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

import React, { VFC } from 'react';
import ReactDatePicker from 'react-datepicker';

type Props = {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
};

const DatePicker: VFC<Props> = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) => {
  return (
    <ReactDatePicker
      locale="ja"
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      {...props}
    />
  );
};

export default DatePicker;
