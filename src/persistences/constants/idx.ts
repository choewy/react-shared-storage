export class Idx {
  private static n = Number(localStorage.getItem('__idx_n') || 0);
  private static s = Number(localStorage.getItem('__idx_s') || 0);
  private static o = Number(localStorage.getItem('__idx_o') || 0);

  public static next(type: 'n' | 's' | 'o') {
    const i = Number(localStorage.getItem(`__idx_${type}`));

    if (i !== this[type]) {
      return null;
    }

    this[type] = i + 1;

    localStorage.setItem(`__idx_${type}`, String(this[type]));

    return this[type];
  }
}
