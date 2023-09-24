import { FC, useEffect } from 'react';

import { BoardMode } from '@/persistences/constants';
import { socket, SocketClientListener } from '@/core';
import { BaseBoardComponent, ContainerComponent } from '@/components';
import { numberStorageStore, objectStorageStore, stringStorageStore } from '@/store';

export const SocketBoard: FC<{ mode: BoardMode }> = ({ mode }) => {
  const numberHandler = numberStorageStore.useHandler();
  const stringHandler = stringStorageStore.useHandler();
  const objectHandler = objectStorageStore.useHandler();

  useEffect(() => {
    if (mode === BoardMode.INTERVAL) {
      return;
    }

    const listener = new SocketClientListener(socket);

    listener.onRpushNumber(numberHandler);
    listener.onRpushString(stringHandler);
    listener.onRpushObject(objectHandler);

    socket.auth = { id: 1 };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [mode, numberHandler, stringHandler, objectHandler]);

  const load = mode === BoardMode.SOCKET;
  const emptyText = socket.disconnected === true ? 'socket.io disconnected' : 'loading...';

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
