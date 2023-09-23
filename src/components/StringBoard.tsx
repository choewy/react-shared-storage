import { FC } from 'react';

import { SharedStorage } from '@/core';

const storage = new SharedStorage<string>('strings');

export const StringBoard: FC = () => {
  const item = storage.useItem();
  const handler = storage.useHandler();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '98vh' }}>
      <h1>String Board</h1>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <button
          onClick={() => {
            handler.push({
              id: Date.now(),
              value: new Date().toISOString(),
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
