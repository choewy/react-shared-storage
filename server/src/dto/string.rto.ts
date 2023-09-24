export class StringRto {
  public readonly value: string;

  constructor(public readonly id: number) {
    this.value = ['string', id].join('_');
  }
}
