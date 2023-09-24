import io from 'socket.io';

import { IdxMap, SocketNumberEventType } from '../persistences';
import { KeyDto, NumberRto } from '../dto';

export class SocketNumberEvent {
  constructor(private readonly io: io.Server, private readonly key: KeyDto) {}

  public sendNew() {
    console.log(`send ${SocketNumberEventType.NEW}`);

    this.io.in(this.key.r).emit(SocketNumberEventType.NEW, new NumberRto(IdxMap.next(this.key, 'n')));
  }
}
