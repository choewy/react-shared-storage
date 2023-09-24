import io from 'socket.io';

import { SocketObjectEventType } from '../persistences';
import { ObjectRto } from '../dto';

export class SocketObjectEvent {
  private idx = 0;

  constructor(private readonly ioServer: io.Server) {}

  private nextIdx() {
    this.idx += 1;

    return this.idx;
  }

  public sendNew() {
    this.ioServer.emit(SocketObjectEventType.NEW, new ObjectRto(this.nextIdx()));
  }
}
