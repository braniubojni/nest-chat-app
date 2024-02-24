import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from './types/messages';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users: Record<string, string> = {};
  private messages: Message[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]) {
    // console.log(`Client connected: ${client.id}\n`);
  }

  handleDisconnect(client: Socket) {
    delete this.users[client.id];
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.users[client.id] = username;
    client.broadcast.emit('userJoined', username);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: Message,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('message', message);
    this.messages.push(message);
  }

  @SubscribeMessage('getInfo')
  handleAllUsers() {
    const users = Object.entries(this.users).map(([id, usr]) => ({
      key: id,
      usr,
    }));
    this.server.emit('info', [users, this.messages]);
  }
}
