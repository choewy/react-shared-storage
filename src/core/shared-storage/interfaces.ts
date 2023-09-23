export class SharedStorageValue<T> {
  public id: number | string;
  public value: T;
}

export class SharedStorageItem<T> {
  constructor(
    public readonly key: string,
    public readonly totalCount: number,
    public readonly itemsCount: number,
    public readonly current: SharedStorageValue<T>,
    public readonly items: SharedStorageValue<T>[],
  ) {}
}

export class SharedStorageHandler<T> {
  constructor(public readonly push: (value: SharedStorageValue<T>) => void, public readonly clear: () => void) {}
}
