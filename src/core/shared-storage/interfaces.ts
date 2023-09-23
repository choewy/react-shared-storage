export class SharedStorageValue<T> {
  public id: number | string;
  public value: T;
}

export class SharedStorageItem<T> {
  constructor(
    public readonly key: string,
    public readonly value: SharedStorageValue<T>,
    public readonly items: SharedStorageValue<T>[],
  ) {}
}

export class SharedStorageHandler<T> {
  constructor(public readonly push: (value: SharedStorageValue<T>) => void, public readonly clear: () => void) {}
}
