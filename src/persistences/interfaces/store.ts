import { v4 } from 'uuid';

import { RecoilState, atom, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

export class Store<T> {
  private readonly store: RecoilState<T>;

  constructor(private readonly key: string, value?: T) {
    this.store = atom({
      key: [this.key, v4()].join('_'),
      default: value || null,
    });
  }

  public useValue() {
    return useRecoilValue(this.store);
  }

  public useState() {
    return useRecoilState(this.store);
  }

  public useSetState() {
    return useSetRecoilState(this.store);
  }

  public useReset() {
    return useResetRecoilState(this.store);
  }
}
