import { For } from 'solid-js';
import { Task, TaskData } from './Task';
import { SetStoreFunction } from 'solid-js/store';

export const TaskList = (props: {
  tasks: TaskData[];
  setTasks: SetStoreFunction<TaskData[]>;
}) => {
  return (
    <ul>
      <For each={props.tasks}>
        {(task, i) => (
          <Task
            task={task}
            setTask={(key, value) => {
              props.setTasks((prev) => {
                const newTasks = [...prev];
                newTasks[i()] = { ...prev[i()], [key]: value };
                return newTasks;
              });
            }}
            deleteTask={() => {
              props.setTasks((prev) => {
                const newTasks = [...prev];
                newTasks.splice(i(), 1);
                return newTasks;
              });
            }}
            up={
              i() === 0
                ? undefined
                : () => {
                    props.setTasks((prev) => {
                      const newTasks = [...prev];
                      const swap = newTasks[i()];
                      newTasks[i()] = newTasks[i() - 1];
                      newTasks[i() - 1] = swap;
                      return newTasks;
                    });
                  }
            }
            down={
              i() === props.tasks.length - 1
                ? () => {
                    props.setTasks((prev) => {
                      const newTasks = [...prev];
                      const swap = newTasks[i()];
                      newTasks[i()] = { title: '' };
                      newTasks[i() + 1] = swap;
                      return newTasks;
                    });
                  }
                : () => {
                    props.setTasks((prev) => {
                      const newTasks = [...prev];
                      const swap = newTasks[i()];
                      newTasks[i()] = newTasks[i() + 1];
                      newTasks[i() + 1] = swap;
                      return newTasks;
                    });
                  }
            }
            duplicate={() => {
              props.setTasks((prev) => {
                const newTasks = [...prev];
                newTasks.splice(i(), 0, {
                  date: prev[i()].date,
                  title: prev[i()].title,
                });
                return newTasks;
              });
            }}
          />
        )}
      </For>
      <Task
        task={{ title: '' }}
        setTask={(key, value) =>
          props.setTasks((prev) => [...prev, { title: '', [key]: value }])
        }
        up={() => {
          props.setTasks((prev) => {
            const newTasks = [...prev];
            const swap = newTasks[props.tasks.length - 1];
            newTasks[props.tasks.length - 1] = { title: '' };
            newTasks.push(swap);
            return newTasks;
          });
        }}
        newItem
      />
    </ul>
  );
};
