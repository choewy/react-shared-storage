import { KeyDto } from 'src/dto';

export class IdxMap {
  private static map = new Map();

  public static create(key: KeyDto) {
    if (!this.map[key.n]) {
      this.map[key.n] = 0;
    }

    if (!this.map[key.s]) {
      this.map[key.s] = 0;
    }

    if (!this.map[key.o]) {
      this.map[key.o] = 0;
    }
  }

  public static next(key: KeyDto, val: keyof Pick<KeyDto, 'n' | 's' | 'o'>) {
    const k = key[val];

    if (!this.map[k]) {
      this.map[k] = 0;
    }

    this.map[k] += 1;

    return this.map[k];
  }

  public static clear(key: KeyDto) {
    if (this.map[key.n]) {
      delete this.map[key.n];
    }

    if (this.map[key.s]) {
      delete this.map[key.s];
    }

    if (this.map[key.o]) {
      delete this.map[key.o];
    }
  }
}
