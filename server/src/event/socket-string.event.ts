import io from 'socket.io';

import { IdxMap, SocketStringEventType } from '../persistences';
import { KeyDto, StringRto } from '../dto';

export class SocketStringEvent {
  constructor(private readonly io: io.Server, private readonly key: KeyDto) {}

  public sendNew() {
    console.log(`send ${SocketStringEventType.NEW}`);

    this.io.in(this.key.r).emit(SocketStringEventType.NEW, new StringRto(IdxMap.next(this.key, 's')));
  }
}
