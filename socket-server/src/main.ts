import { ServerContext } from './persistences';

import { SocketNumberEvent, SocketObjectEvent, SocketStringEvent } from './event';

const ctx = new ServerContext();

ctx.http.listen(3001, () => {
  setInterval(() => {
    new SocketNumberEvent(ctx.io).sendNew();
  }, 1_000);

  setInterval(() => {
    new SocketStringEvent(ctx.io).sendNew();
  }, 1_000);

  setInterval(() => {
    new SocketObjectEvent(ctx.io).sendNew();
  }, 1_000);
});
