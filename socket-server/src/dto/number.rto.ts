export class NumberRto {
  public readonly id: number | string;
  public readonly value: number;

  constructor(id: number) {
    this.id = ['socket', id].join('_');
    this.value = id;
  }
}
