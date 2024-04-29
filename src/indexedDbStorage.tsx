import { AsyncStorage } from '@solid-primitives/storage';
import { INDEXEDDB, createInstance } from 'localforage';

const store = createInstance({ name: 'kagetask', driver: INDEXEDDB });
class IndexedDBAPI implements AsyncStorage {
  #store: LocalForage;
  constructor() {
    this.#store = store;
  }
  getItem(key: string) {
    return this.#store.getItem<string>(key);
  }
  clear() {
    this.#store.clear();
  }
  async setItem(key: string, value: string) {
    await this.#store.setItem(key, value);
  }
  async removeItem(key: string) {
    await this.#store.removeItem(key);
  }
  async key(index: number) {
    const keys = await this.#store.keys();
    return keys[index];
  }
  get length() {
    return this.#store.keys().then((keys) => keys.length);
  }
}
export const indexedDbStorage = new IndexedDBAPI();
