import io from 'socket.io';

import { IdxMap, SocketObjectEventType } from '../persistences';
import { KeyDto, ObjectRto } from '../dto';

export class SocketObjectEvent {
  constructor(private readonly io: io.Server, private readonly key: KeyDto) {}

  public sendNew() {
    console.log(`send ${SocketObjectEventType.NEW}`);

    this.io.in(this.key.r).emit(SocketObjectEventType.NEW, new ObjectRto(IdxMap.next(this.key, 'o')));
  }
}
