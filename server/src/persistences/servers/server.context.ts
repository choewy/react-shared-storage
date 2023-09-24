import express from 'express';
import http from 'http';
import io from 'socket.io';

export class ServerContext {
  public readonly express: express.Express;
  public readonly http: http.Server;
  public readonly io: io.Server;

  constructor() {
    this.express = express();
    this.http = http.createServer(this.express);
    this.io = new io.Server(this.http, {
      transports: ['websocket'],
    });
  }
}
