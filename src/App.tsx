import { makePersisted } from '@solid-primitives/storage';
import { createEffect } from 'solid-js';
import { indexedDbStorage } from './indexedDbStorage';
import { TaskData } from './Task';
import { createStore } from 'solid-js/store';
import { TaskList } from './TaskList';
import { ExportText } from './ExportText';
import { setDate } from './setDate';
import { sortFunction } from './sortFunction';

function App() {
  const [tasks, setTasks] = makePersisted(
    createStore<TaskData[]>([
      {
        title: 'My Task',
      },
    ]),
    {
      storage: indexedDbStorage,
    },
  );
  createEffect(() => {
    console.log('Tasks:', tasks);
  });

  return (
    <div class="p-2">
      <button
        class="border px-2 bg-sky-600 text-white mb-4 mt-2"
        onClick={() => {
          setTasks((prev) => {
            const newTasks = [...prev];
            console.log(newTasks);
            const sortedTasks = newTasks.map(setDate).sort(sortFunction);
            console.log(sortedTasks);
            return sortedTasks;
          });
        }}
      >
        Sort
      </button>
      <TaskList tasks={tasks} setTasks={setTasks} />
      <ExportText tasks={tasks} />
    </div>
  );
}

export default App;
