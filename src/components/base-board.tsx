import { useCallback, useEffect } from 'react';

import { Idx } from '@/persistences/constants';
import { timeoutMap } from '@/core';

import { BaseBoardComponentProps } from './interfaces';

export function BaseBoardComponent<T>({
  type,
  load,
  title,
  emptyText,
  storage,
  makePushValue,
}: BaseBoardComponentProps<T>) {
  const item = storage.useItem(load);
  const handler = storage.useHandler();

  const onRpush = useCallback(() => {
    handler.rpush(makePushValue(Idx.nextForce(type), 'rpush'));
  }, [item, type, handler]);

  const onLpop = useCallback(() => {
    handler.lpop(item.current?.id);
  }, [item, handler]);

  useEffect(() => {
    if (item === null) {
      return;
    }

    if (item.totalCount > 5) {
      timeoutMap.add(type, () => handler.lpop());

      return () => {
        timeoutMap.clear(type);
      };
    }
  }, [type, load, item]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '95vh' }}>
      <h1>{title}</h1>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <button onClick={onRpush}>rpush</button>
        <button onClick={onLpop}>lpop</button>
        <button onClick={handler.clear}>clear</button>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'scroll',
          padding: 30,
          boxSizing: 'border-box',
          background: '#123',
          color: 'white',
        }}
      >
        <pre>{item ? JSON.stringify(item, null, 2) : <>{emptyText}</>}</pre>
      </div>
    </div>
  );
}
