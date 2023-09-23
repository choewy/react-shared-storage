import { FC } from 'react';

import { SharedStorage } from '@/core';

const storage = new SharedStorage<object>('objects');

export const ObjectBoard: FC = () => {
  const item = storage.useItem();
  const handler = storage.useHandler();

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            handler.push({
              id: Date.now(),
              value: { timestamp: Date.now() },
            });
          }}
        >
          push
        </button>
        <button onClick={handler.clear}>clear</button>
      </div>
      <pre>{item ? JSON.stringify(item, null, 2) : <>null</>}</pre>
    </div>
  );
};
