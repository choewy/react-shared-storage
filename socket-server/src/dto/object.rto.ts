export class ObjectRto {
  public readonly value: object;

  constructor(public readonly id: number) {
    this.value = {
      key: ['key', id].join('_'),
      name: ['name', id].join('_'),
    };
  }
}
