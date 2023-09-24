import io, { Socket } from 'socket.io-client';

import { SharedStorageHandler } from '../shared-storage';

export const socket = io('ws://localhost:3001', {
  transports: ['websocket'],
  autoConnect: false,
  reconnection: true,
});

export class SocketClientListener {
  constructor(private readonly socket: Socket) {}

  public onRpushNumber(handler: SharedStorageHandler<number>) {
    this.socket.on('rpush_number', handler.rpush);
  }

  public onRpushString(handler: SharedStorageHandler<string>) {
    this.socket.on('rpush_string', handler.rpush);
  }

  public onRpushObject(handler: SharedStorageHandler<object>) {
    this.socket.on('rpush_object', handler.rpush);
  }
}
