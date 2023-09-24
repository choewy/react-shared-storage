export class TimeoutMap {
  private n: NodeJS.Timeout = null;
  private s: NodeJS.Timeout = null;
  private o: NodeJS.Timeout = null;

  private randomMilliSeconds() {
    return 500 + Math.floor(Math.random() * 1000);
  }

  public add(type: 'n' | 's' | 'o', callback: () => void, milliseconds = this.randomMilliSeconds()) {
    if (this[type]) {
      return;
    }

    this[type] = setTimeout(() => {
      callback();
      this.clear(type);
    }, milliseconds);
  }

  public clear(type: 'n' | 's' | 'o') {
    if (this[type] === null) {
      return;
    }

    clearTimeout(this[type]);
    this[type] = null;
  }
}

export const timeoutMap = new TimeoutMap();
