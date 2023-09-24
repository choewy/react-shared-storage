import { KeyDto } from 'src/dto';

export class IntervalMap {
  private static map = new Map();

  public static add(key: string, callback: () => void, milliseconds: number = 1_000) {
    if (this.map[key]) {
      return;
    }

    this.map[key] = setInterval(callback, milliseconds);
  }

  public static clear(key: KeyDto) {
    if (this.map[key.n]) {
      clearInterval(this.map[key.n]);
      delete this.map[key.n];
    }

    if (this.map[key.s]) {
      clearInterval(this.map[key.s]);
      delete this.map[key.s];
    }

    if (this.map[key.o]) {
      clearInterval(this.map[key.o]);
      delete this.map[key.o];
    }
  }
}
