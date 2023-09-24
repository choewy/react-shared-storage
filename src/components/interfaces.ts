import { SharedStorage, SharedStorageValue } from '@/core';
import { PropsWithChildren } from 'react';

export interface ContainerComponentProps extends PropsWithChildren {
  columeCount: number;
}

export interface BaseBoardComponentProps<T> {
  type: 'n' | 's' | 'o';
  load: boolean;
  title: string;
  emptyText: string;
  storage: SharedStorage<T>;
  makePushValue(idx: number, subfix: string): SharedStorageValue<T>;
}
