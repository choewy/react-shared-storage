import { SharedStorage } from '@/core';
import { PropsWithChildren } from 'react';

export interface ContainerComponentProps extends PropsWithChildren {
  columeCount: number;
}

export interface BaseBoardComponentProps<T> {
  load: boolean;
  title: string;
  emptyText: string;
  storage: SharedStorage<T>;
  onPush(): void;
}
