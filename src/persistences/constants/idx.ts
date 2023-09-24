export class Idx {
  private static n = Number(localStorage.getItem('__idx_n') || 0);
  private static s = Number(localStorage.getItem('__idx_s') || 0);
  private static o = Number(localStorage.getItem('__idx_o') || 0);

  public static next(type: 'n' | 's' | 'o') {
    const val = Number(localStorage.getItem(`__idx_${type}`));

    if (val !== this[type]) {
      return null;
    }

    this[type] = val + 1;

    localStorage.setItem(`__idx_${type}`, String(this[type]));

    return this[type];
  }

  public static nextForce(type: 'n' | 's' | 'o') {
    let idx = 0;

    const val = Number(localStorage.getItem(`__idx_${type}`));

    if (val == null) {
      idx = 1;
    } else {
      idx = val + 1;
    }

    localStorage.setItem(`__idx_${type}`, String(idx));

    return idx;
  }
}
