/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import socketInstance from '../clients/socket/socketInstance';
import { Message } from '../App';

type SocketEvent = {
  event: string;
  handler: Function;
};

interface IUseSocketProps {
  roomName: string;
  socketEvents: SocketEvent[];
  isReady?: boolean;
  userName?: string;
}

const useSocket = ({
  roomName,
  socketEvents = [],
  isReady = true,
  userName,
}: IUseSocketProps) => {
  const socketEventHandler = (handler: Function) => (data: any) => {
    handler(data);
  };

  const emitEvent = useCallback((event: string, data?: unknown) => {
    socketInstance.emit(event, data);
  }, []);

  const receivedMsg = new Map();

  useEffect(() => {
    const handleSocketEvents = () => {
      if (isReady && roomName) {
        socketInstance.on('connect', () => {
          // console.log('connected');
        });

        socketInstance.emit('joinChat', userName);

        socketInstance.on(
          'ack',
          (ack: { status: string; message: Message }) => {
            const key = `${ack.message.username}-${ack.message.timestamp}`;
            if (ack.status !== 'success' || !receivedMsg.has(key)) {
              socketInstance.emit('messageErr', ack.message);
            }
          }
        );

        socketInstance.on('message', (msg: Message) => {
          const key = `${msg.username}-${msg.timestamp}`;
          receivedMsg.set(key, msg);
        });

        socketEvents.forEach(({ event, handler }) => {
          const fullEventName = event;
          socketInstance.on(fullEventName, socketEventHandler(handler));
        });

        return () => {
          socketEvents.forEach(({ event, handler }) => {
            const fullEventName = event;
            socketInstance.off(fullEventName, socketEventHandler(handler));
          });
        };
      }
    };

    return handleSocketEvents();
  }, [isReady]);

  return emitEvent;
};

export default useSocket;
