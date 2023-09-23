import { FC } from 'react';

import { SharedStorage } from '@/core';

const stoage = new SharedStorage<number>('numbers');

export const NumberBoard: FC = () => {
  const item = stoage.useItem();
  const handler = stoage.useHandler();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '98vh' }}>
      <h1>Number Board</h1>
      <div style={{ display: 'flex', marginBottom: 10 }}>
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
