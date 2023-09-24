export class StringRto {
  public readonly id: number | string;
  public readonly value: string;

  constructor(id: number) {
    this.id = ['socket', id].join('_');
    this.value = ['string', id].join('_');
  }
}
