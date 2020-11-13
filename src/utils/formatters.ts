import { parseISO, format } from 'date-fns';

export const formatISOString = (isoString: string): string => {
  const date = parseISO(isoString);
  return format(date, 'yyyy年M月d日');
};
