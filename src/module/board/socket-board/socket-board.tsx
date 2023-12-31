import { FC, useEffect } from 'react';

import { BoardMode } from '@/persistences/constants';
import { socket, SocketClientListener } from '@/core';
import { BaseBoardComponent, ContainerComponent } from '@/components';
import { numberStorageStore, objectStorageStore, stringStorageStore } from '@/store';
import { makeNumberValue, makeObjectValue, makeStringValue } from '@/utils';

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

  const emptyText =
    socket.connected === false
      ? 'socket.io disconnected.\nserver is closed.\nenter `npm run server` in other terminal.'
      : 'loading...';

  return (
    <ContainerComponent columeCount={3}>
      <BaseBoardComponent
        type="n"
        load={load}
        title="NumberType"
        emptyText={emptyText}
        storage={numberStorageStore}
        makePushValue={makeNumberValue}
      />
      <BaseBoardComponent
        type="s"
        load={load}
        title="StringType"
        emptyText={emptyText}
        storage={stringStorageStore}
        makePushValue={makeStringValue}
      />
      <BaseBoardComponent
        type="o"
        load={load}
        title="ObjectType"
        emptyText={emptyText}
        storage={objectStorageStore}
        makePushValue={makeObjectValue}
      />
    </ContainerComponent>
  );
};
