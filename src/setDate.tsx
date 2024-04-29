import { TaskData } from './Task';

export const setDate = (task: TaskData): TaskData => {
  const match = / hold:(\d)( |$)/.exec(task.title);
  if (match) {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(match[1]));
    return {
      ...task,
      date: `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`,
    };
  }
  return task;
};
