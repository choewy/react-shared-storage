import { Socket } from 'socket.io';

import { IdxMap, IntervalMap, ServerContext } from './persistences';
import { SocketNumberEvent, SocketObjectEvent, SocketStringEvent } from './event';
import { KeyDto } from './dto';

const ctx = new ServerContext();

ctx.io.on('connect', async (socket: Socket) => {
  console.log(`connected ${socket.id} - { id: ${socket.handshake.auth.id} }`);

  const id = socket.handshake.auth.id;

  if (!id) {
    socket.disconnect(true);
    return;
  }

  const key = new KeyDto(id);
  const sockets = await ctx.io.in(key.r).fetchSockets();

  if (sockets.length === 0) {
    IdxMap.create(key);
    IntervalMap.add(key.n, () => new SocketNumberEvent(ctx.io, key).sendNew());
    IntervalMap.add(key.s, () => new SocketStringEvent(ctx.io, key).sendNew());
    IntervalMap.add(key.o, () => new SocketObjectEvent(ctx.io, key).sendNew());
  }

  socket.join(key.r);

  socket.on('disconnect', async () => {
    console.log(`disconnted ${socket.id} - { id: ${socket.handshake.auth.id} }`);

    const id = socket.handshake.auth.id;

    if (!id) {
      socket.disconnect(true);
      return;
    }

    const key = new KeyDto(id);
    const sockets = await ctx.io.in(key.r).fetchSockets();

    if (sockets.length === 0) {
      IdxMap.clear(key);
      IntervalMap.clear(key);
    }
  });
});

ctx.http.listen(3001);
