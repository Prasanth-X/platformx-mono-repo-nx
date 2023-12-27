import { format } from 'date-fns';

export const dateFormat = (dataTime: any = '') => {
  if (dataTime) {
    const assign: any = new Date(dataTime);
    if (assign !== 'Invalid Date' && !isNaN(assign)) {
      //input validation
      const date_time = format(new Date(dataTime), 'LLL dd | H:mm');
      const date = format(new Date(dataTime), 'dd');
      const month = format(new Date(dataTime), 'LLL');

      return { date_time, date, month };
    }
  }
  return dataTime;
};
