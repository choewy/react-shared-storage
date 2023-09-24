import io from 'socket.io';

import { SocketNumberEventType } from '../persistences';
import { NumberRto } from '../dto';

export class SocketNumberEvent {
  private idx = 0;

  constructor(private readonly ioServer: io.Server) {}

  private nextIdx() {
    this.idx += 1;

    return this.idx;
  }

  public sendNew() {
    this.ioServer.emit(SocketNumberEventType.NEW, new NumberRto(this.nextIdx()));
  }
}
