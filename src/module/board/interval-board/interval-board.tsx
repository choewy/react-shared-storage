import { FC, useEffect } from 'react';

import { BoardMode, Idx } from '@/persistences/constants';
import { intervalMap } from '@/core';
import { BaseBoardComponent, ContainerComponent } from '@/components';
import { numberStorageStore, objectStorageStore, stringStorageStore } from '@/store';

export const IntervalBoard: FC<{ mode: BoardMode }> = ({ mode }) => {
  const numberHandler = numberStorageStore.useHandler();
  const stringHandler = stringStorageStore.useHandler();
  const objectHandler = objectStorageStore.useHandler();

  useEffect(() => {
    if (mode === BoardMode.SOCKET) {
      return;
    }

    intervalMap.add('n', () => {
      const idx = Idx.next('n');

      numberHandler.rpush({
        id: ['interval', idx].join('_'),
        value: idx,
      });
    });

    return () => {
      intervalMap.clear('n');
    };
  }, [mode, numberHandler]);

  useEffect(() => {
    if (mode === BoardMode.SOCKET) {
      return;
    }

    intervalMap.add('s', () => {
      const idx = Idx.next('s');

      stringHandler.rpush({
        id: ['interval', idx].join('_'),
        value: ['string', idx].join('_'),
      });
    });

    return () => {
      intervalMap.clear('s');
    };
  }, [mode, stringHandler]);

  useEffect(() => {
    if (mode === BoardMode.SOCKET) {
      return;
    }

    intervalMap.add('o', () => {
      const idx = Idx.next('o');

      objectHandler.rpush({
        id: ['interval', idx].join('_'),
        value: {
          key: ['key', idx].join('_'),
          name: ['name', idx].join('_'),
        },
      });
    });

    return () => {
      intervalMap.clear('o');
    };
  }, [mode, objectHandler]);

  const load = mode === BoardMode.INTERVAL;
  const emptyText = 'loading...';

  return (
    <ContainerComponent columeCount={3}>
      <BaseBoardComponent
        load={load}
        title="NumberType"
        emptyText={emptyText}
        storage={numberStorageStore}
        onPush={() => {}}
      />
      <BaseBoardComponent
        load={load}
        title="StringType"
        emptyText={emptyText}
        storage={stringStorageStore}
        onPush={() => {}}
      />
      <BaseBoardComponent
        load={load}
        title="ObjectType"
        emptyText={emptyText}
        storage={objectStorageStore}
        onPush={() => {}}
      />
    </ContainerComponent>
  );
};
