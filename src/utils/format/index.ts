import dayjs from 'dayjs';

export const formatTimeNotation = (date: Date) => {
  return dayjs(date).format('A H:mm');
};

export const formatTimeLimitNotation = (date: Date) => {
  return dayjs(date).format('MMMMDD日(ddd) A H:mm');
};

export const formatWeekdayNotation = (date: Date) => {
  return dayjs(date).format('MMMMDD日(ddd)');
};

export const formatFullNotation = (date: Date) => {
  return dayjs(date).format('YYYY年MMMMDD日(ddd)');
};

export const formatPriceNotation = (price: number) => {
  return price.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
};
