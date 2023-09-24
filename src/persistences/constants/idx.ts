export class Idx {
  private static n = 0;
  private static s = 0;
  private static o = 0;

  public static next(type: 'n' | 's' | 'o') {
    this[type] += 1;

    return this[type];
  }
}
