import { FC, useCallback, useState } from 'react';

import { BoardMode } from '@/persistences/constants';

import { IntervalBoard } from './interval-board';
import { SocketBoard } from './socket-board';

export const Board: FC = () => {
  const [mode, setMode] = useState<BoardMode>(BoardMode.INTERVAL);

  const onChangeMode = useCallback(() => {
    setMode((prev) => {
      switch (prev) {
        case BoardMode.INTERVAL:
          return BoardMode.SOCKET;

        case BoardMode.SOCKET:
          return BoardMode.INTERVAL;
      }
    });
  }, [setMode]);

  return (
    <div>
      <div>
        <button onClick={onChangeMode}>mode({`current: ${mode}`})</button>
      </div>

      {mode === BoardMode.INTERVAL ? <IntervalBoard mode={mode} /> : <SocketBoard mode={mode} />}
    </div>
  );
};
