import { useCallback, useEffect, useState } from 'react';

import { Store } from '@/persistences';

import { SharedStorageHandler, SharedStorageItem, SharedStorageValue } from './interfaces';

export class SharedStorage<T> {
  public readonly storage = localStorage;

  public readonly loader: Store<boolean>;

  constructor(public readonly key: string) {
    this.loader = new Store([key, 'load'].join('_'), true);
  }

  private parse(value: string) {
    try {
      return JSON.parse(value) as SharedStorageValue<T>[];
    } catch {
      return [];
    }
  }

  private getItems(): SharedStorageValue<T>[] {
    const value = this.storage.getItem(this.key);

    if (value == null) {
      return [];
    }

    return this.parse(value);
  }

  private push(value: SharedStorageValue<T>) {
    const items = this.getItems();

    if (items.find((item) => item.id === value.id)) {
      return;
    }

    this.storage.setItem(this.key, JSON.stringify(this.getItems().concat([value])));
  }

  private clear() {
    this.storage.removeItem(this.key);
  }

  public useItem() {
    const [item, setItem] = useState<SharedStorageItem<T> | null>(null);
    const [load, setLoad] = this.loader.useState();

    const onChangeStorage = useCallback(
      (e: StorageEvent) => {
        if (e.key !== this.key) {
          return;
        }

        setLoad(true);
      },
      [setLoad],
    );

    useEffect(() => {
      window.addEventListener('storage', onChangeStorage);

      return () => {
        window.removeEventListener('storage', onChangeStorage);
      };
    }, [onChangeStorage]);

    useEffect(() => {
      if (load === false) {
        return;
      }

      const items = this.getItems();
      const totalCount = items.length;
      const current = items.shift() || null;
      const itemsCount = items.length;

      setItem(new SharedStorageItem(this.key, totalCount, itemsCount, current, items));
      setLoad(false);
    }, [load, setItem, setLoad]);

    return item;
  }

  public useHandler() {
    const setLoad = this.loader.useSetState();

    const push = useCallback(
      (value: SharedStorageValue<T>) => {
        this.push(value);
        setLoad(true);
      },
      [setLoad],
    );

    const clear = useCallback(() => {
      this.clear();
      setLoad(true);
    }, [setLoad]);

    return new SharedStorageHandler(push, clear);
  }
}
