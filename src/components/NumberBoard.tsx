import { FC, useEffect } from 'react';

import { SharedStorage } from '@/core';

const storage = new SharedStorage<number>('numbers');

export const NumberBoard: FC = () => {
  const item = storage.useItem();
  const handler = storage.useHandler();

  useEffect(() => {
    if (item === null) {
      return;
    }

    if (item.totalCount === 15) {
      return handler.clear();
    }

    const interval = setInterval(() => {
      handler.rpush({
        id: ['id', item.totalCount + 1].join('_'),
        value: item.totalCount + 1,
      });
    }, 2_000);

    return () => {
      clearInterval(interval);
    };
  }, [item, handler.rpush, handler.clear]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '98vh' }}>
      <h1>Number Board</h1>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <button
          onClick={() => {
            handler.rpush({
              id: ['id', item.totalCount + 1].join('_'),
              value: item.totalCount + 1,
            });
          }}
        >
          push
        </button>
        <button
          onClick={() => {
            handler.lpop(item.current?.id);
          }}
        >
          next
        </button>
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
        <pre>{item ? JSON.stringify(item, null, 2) : <>null</>}</pre>
      </div>
    </div>
  );
};
