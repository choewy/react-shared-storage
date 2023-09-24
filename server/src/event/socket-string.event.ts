import io from 'socket.io';

import { SocketStringEventType } from '../persistences';
import { StringRto } from '../dto';

export class SocketStringEvent {
  private idx = 0;

  constructor(private readonly ioServer: io.Server) {}

  private nextIdx() {
    this.idx += 1;

    return this.idx;
  }

  public sendNew() {
    this.ioServer.emit(SocketStringEventType.NEW, new StringRto(this.nextIdx()));
  }
}
