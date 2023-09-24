export class KeyDto {
  public readonly r: string;
  public readonly n: string;
  public readonly s: string;
  public readonly o: string;

  constructor(id: number) {
    this.r = [id, 'room'].join(':');
    this.n = [id, 'number'].join(':');
    this.s = [id, 'string'].join(':');
    this.o = [id, 'object'].join(':');
  }
}
