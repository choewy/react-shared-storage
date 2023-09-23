import { FC } from 'react';

import { SharedStorage } from '@/core';

const stoage = new SharedStorage<number>('numbers');

export const NumberBoard: FC = () => {
  const item = stoage.useItem();
  const handler = stoage.useHandler();

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            handler.push({
              id: Date.now(),
              value: Date.now(),
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
