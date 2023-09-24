export class IntervalMap {
  private n: NodeJS.Timer = null;
  private s: NodeJS.Timer = null;
  private o: NodeJS.Timer = null;

  public add(type: 'n' | 's' | 'o', callback: () => void, milliseconds = 1_000) {
    if (this[type]) {
      return;
    }

    this[type] = setInterval(callback, milliseconds);
  }

  public clear(type: 'n' | 's' | 'o') {
    if (this[type] === null) {
      return;
    }

    clearInterval(this[type]);
    this[type] = null;
  }
}

export const intervalMap = new IntervalMap();
