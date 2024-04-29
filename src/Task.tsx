import { Show, createEffect } from 'solid-js';

export type TaskData = {
  date?: string;
  startTime?: string;
  endTime?: string;
  title: string;
};
export const Task = (
  props:
    | {
        task: TaskData;
        setTask: <T extends keyof TaskData>(key: T, value: TaskData[T]) => void;
        deleteTask: () => void;
        newItem?: false;
        duplicate: () => void;
        up?: () => void;
        down?: () => void;
      }
    | {
        task: TaskData;
        setTask: <T extends keyof TaskData>(key: T, value: TaskData[T]) => void;
        deleteTask?: () => void;
        newItem: true;
        up: () => void;
        down?: undefined;
        duplicate?: undefined;
      }
) => {
  createEffect(() => {
    console.log('Task:', props.task);
  });
  return (
    <li>
      <button
        type="button"
        disabled={props.newItem}
        onClick={() => {
          props.deleteTask?.();
        }}
      >
        x
      </button>
      <button
        type="button"
        onClick={() => props.up?.()}
        disabled={props.up === undefined}
      >
        ↑
      </button>
      <button
        type="button"
        onClick={() => props.down?.()}
        disabled={props.down === undefined}
      >
        ↓
      </button>
      <input
        type="date"
        value={props.task.date ?? undefined}
        onChange={({ target, currentTarget: { value } }) => {
          props.setTask('date', value);
          if (props.newItem) {
            target.value = '';
          }
        }}
      />
      <input
        type="time"
        value={props.task.startTime ?? undefined}
        onChange={({ target, currentTarget: { value } }) => {
          props.setTask('startTime', value);
          if (props.newItem) {
            target.value = '';
          }
        }}
      />
      <input
        type="time"
        value={props.task.endTime ?? undefined}
        onChange={({ target, currentTarget: { value } }) => {
          props.setTask('endTime', value);
          if (props.newItem) {
            target.value = '';
          }
        }}
      />
      <input
        type="text"
        value={props.task.title}
        onChange={({ target, currentTarget: { value } }) => {
          props.setTask('title', value);
          if (props.newItem) {
            target.value = '';
          }
        }}
      />
      <Show when={!props.newItem}>
        <button type="button" onClick={props.duplicate}>
          Duplicate
        </button>
      </Show>
      <Show when={!props.task.endTime && !props.task.startTime}>
        <button
          type="button"
          onClick={() => {
            const now = new Date();
            props.setTask(
              'startTime',
              `${`${now.getHours()}`.padStart(2, '0')}:${`${now.getMinutes()}`.padStart(2, '0')}`
            );
          }}
        >
          Start
        </button>
      </Show>
      <Show when={props.task.startTime && !props.task.endTime}>
        <button
          type="button"
          onClick={() => {
            const now = new Date();
            props.setTask(
              'endTime',
              `${`${now.getHours()}`.padStart(2, '0')}:${`${now.getMinutes()}`.padStart(2, '0')}`
            );
          }}
        >
          End
        </button>
      </Show>
      <Show when={props.task.endTime}>
        <button
          type="button"
          onClick={() => {
            props.setTask('endTime', '');
            props.setTask('startTime', '');
          }}
        >
          Clear Time
        </button>
      </Show>
      <Show when={!props.task.date}>
        <button
          type="button"
          onClick={() => {
            const now = new Date();
            props.setTask(
              'date',
              `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, '0')}-${`${now.getDate()}`.padStart(2, '0')}`
            );
          }}
        >
          Today
        </button>
      </Show>
      <Show when={props.task.date}>
        <button type="button" onClick={() => props.setTask('date', '')}>
          Clear Date
        </button>
      </Show>
    </li>
  );
};
