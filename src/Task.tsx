import { JSX, Show, createEffect, splitProps } from 'solid-js';
import clsx from 'clsx';

export type TaskData = {
  date?: string;
  startTime?: string;
  endTime?: string;
  title: string;
};
const Button = (
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: JSX.Element;
  },
) => {
  const [local, others] = splitProps(props, ['children', 'class']);
  return (
    <button class={clsx('border', local.class)} {...others}>
      {local.children}
    </button>
  );
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
      },
) => {
  createEffect(() => {
    console.log('Task:', props.task);
  });
  return (
    <li class="mb-1 flex">
      <Button
        class={clsx(
          'border-red-600 w-6 h-6 mr-1',
          props.newItem ? 'bg-gray-100' : 'bg-red-100',
        )}
        type="button"
        disabled={props.newItem}
        onClick={() => {
          props.deleteTask?.();
        }}
      >
        <Show when={!props.newItem}>❌</Show>
        <Show when={props.newItem}>　</Show>
      </Button>
      <button
        type="button"
        class="w-6 h-6 border mr-1 bg-slate-100"
        onClick={() => props.up?.()}
        disabled={props.up === undefined}
      >
        ↑
      </button>
      <button
        type="button"
        class="w-6 h-6 border mr-2 bg-slate-100"
        onClick={() => props.down?.()}
        disabled={props.down === undefined}
      >
        ↓
      </button>
      <input
        type="date"
        class="mr-5"
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
        class="border-b-slate-500 border-b mr-4"
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
        class="border-b-slate-500 border-b mr-2"
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
        class={clsx(
          'px-1 mr-1',
          props.task.startTime !== '' &&
            props.task.startTime !== undefined &&
            (props.task.endTime === '' || props.task.endTime === undefined) &&
            'bg-blue-100',
        )}
        value={props.task.title}
        onChange={({ target, currentTarget: { value } }) => {
          props.setTask('title', value);
          if (props.newItem) {
            target.value = '';
          }
        }}
      />
      <button
        class={clsx(
          'border px-1 mr-1',
          props.newItem ? 'bg-slate-100 text-slate-300' : 'bg-green-200',
        )}
        type="button"
        onClick={props.duplicate}
        disabled={!props.newItem}
      >
        Duplicate
      </button>
      <Show when={!props.task.endTime && !props.task.startTime}>
        <button
          class="w-20 bg-blue-100 mr-1 border"
          type="button"
          onClick={() => {
            const now = new Date();
            props.setTask(
              'startTime',
              `${`${now.getHours()}`.padStart(2, '0')}:${`${now.getMinutes()}`.padStart(2, '0')}`,
            );
          }}
        >
          Start
        </button>
      </Show>
      <Show when={props.task.startTime && !props.task.endTime}>
        <button
          class="w-20 bg-purple-100 mr-1 border"
          type="button"
          onClick={() => {
            const now = new Date();
            props.setTask(
              'endTime',
              `${`${now.getHours()}`.padStart(2, '0')}:${`${now.getMinutes()}`.padStart(2, '0')}`,
            );
          }}
        >
          End
        </button>
      </Show>
      <Show when={props.task.endTime}>
        <button
          class="w-20 bg-red-100 mr-1 border"
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
          class="w-20 bg-green-100 mr-1 border"
          type="button"
          onClick={() => {
            const now = new Date();
            props.setTask(
              'date',
              `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, '0')}-${`${now.getDate()}`.padStart(2, '0')}`,
            );
          }}
        >
          Today
        </button>
      </Show>
      <Show when={props.task.date}>
        <button
          type="button"
          class="mr-1 bg-orange-100 w-20 border"
          onClick={() => props.setTask('date', '')}
        >
          Clear Date
        </button>
      </Show>
    </li>
  );
};
