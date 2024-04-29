import { TaskData } from './Task';

const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ExportText = (props: { tasks: TaskData[] }) => {
  const taskValue = () => {
    return props.tasks
      .map((task) => {
        const date = task.date ? new Date(task.date) : undefined;
        return `  ${date ? `${date.getFullYear()}/${`${date.getMonth()}`.padStart(2, '0')}/${`${date.getDate()}`.padStart(2, '0')} ${dayMap[date.getDay()]}` : '              '} ${task.startTime ?? '     '} ${task.endTime ?? '     '} ${task.title}`;
      })
      .join('\n');
  };
  return (
    <textarea readonly rows={6} cols={100}>
      {taskValue()}
    </textarea>
  );
};
