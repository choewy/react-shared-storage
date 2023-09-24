import { useEffect } from 'react';
import { BaseBoardComponentProps } from './interfaces';

export function BaseBoardComponent<T>({ load, title, storage, onPush }: BaseBoardComponentProps<T>) {
  const item = storage.useItem(load);
  const handler = storage.useHandler();

  useEffect(() => {
    if (item === null) {
      return;
    }

    if (item.totalCount === 15) {
      return handler.clear();
    }
  }, [load, item]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '95vh' }}>
      <h1>{title}</h1>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <button onClick={onPush}>rpush</button>
        <button
          onClick={() => {
            handler.lpop(item.current?.id);
          }}
        >
          lpop
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
        <pre>{item ? JSON.stringify(item, null, 2) : <>loading...</>}</pre>
      </div>
    </div>
  );
}
