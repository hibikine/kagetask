import { TaskData } from './Task';

export const sortFunction = (a: TaskData, b: TaskData): number => {
  if (
    (a.date === '' || a.date === undefined) &&
    b.date !== '' &&
    b.date !== undefined
  )
    return -1;
  if (
    (b.date === '' || b.date === undefined) &&
    a.date !== '' &&
    a.date !== undefined
  )
    return 1;
  if (
    a.date !== '' &&
    a.date !== undefined &&
    b.date !== '' &&
    b.date !== undefined
  ) {
    const dateA = a.date ? new Date(a.date) : undefined;
    const dateB = b.date ? new Date(b.date) : undefined;
    const dateDiff = (dateA?.getTime() ?? 0) - (dateB?.getTime() ?? 0);
    if (dateDiff !== 0) {
      return dateDiff;
    }
  }
  if (
    (a.startTime === '' || a.startTime === undefined) &&
    b.startTime !== '' &&
    b.startTime !== undefined
  )
    return 1;
  if (
    a.startTime !== '' &&
    a.startTime !== undefined &&
    (b.startTime === '' || b.startTime === undefined)
  )
    return -1;
  if (
    a.startTime !== '' &&
    a.startTime !== undefined &&
    b.startTime !== '' &&
    b.startTime !== undefined
  ) {
    const startTimeDiff = (a.startTime ?? '').localeCompare(b.startTime ?? '');
    if (startTimeDiff !== 0) {
      return startTimeDiff;
    }
  }
  if (
    (a.endTime === '' || a.endTime === undefined) &&
    b.endTime !== '' &&
    b.endTime !== undefined
  )
    return 1;
  if (
    a.endTime !== '' &&
    a.endTime !== undefined &&
    (b.endTime === '' || b.endTime === undefined)
  )
    return -1;
  if (
    a.endTime !== '' &&
    a.endTime !== undefined &&
    b.endTime !== '' &&
    b.endTime !== undefined
  ) {
    const endTimeDiff = (a.endTime ?? '').localeCompare(b.endTime ?? '');
    if (endTimeDiff !== 0) {
      return endTimeDiff;
    }
  }

  console.log('a:', a.title, 'b:', b.title, a.title.localeCompare(b.title));
  return a.title.localeCompare(b.title);
};
