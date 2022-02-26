import dayjs from 'dayjs';

export const formatTimeNotation = (date: Date) => dayjs(date).format('A H:mm');

export const formatTimeLimitNotation = (date: Date) =>
  dayjs(date).format('MMMMDD日(ddd) A H:mm');

export const formatWeekdayNotation = (date: Date) =>
  dayjs(date).format('MMMMDD日(ddd)');

export const formatDate = (date: Date) => dayjs(date).format('YYYY/MM/DD');

export const formatFullNotation = (date: Date) =>
  dayjs(date).format('YYYY年MMMMDD日(ddd)');

export const formatPriceNotation = (price: number) =>
  price.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
