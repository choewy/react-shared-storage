export class ObjectRto {
  public readonly id: number | string;
  public readonly value: object;

  constructor(id: number) {
    this.id = ['socket', id].join('_');
    this.value = {
      key: ['key', id].join('_'),
      name: ['name', id].join('_'),
    };
  }
}
