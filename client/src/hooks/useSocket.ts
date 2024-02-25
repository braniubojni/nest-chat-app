/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import socketInstance from '../clients/socket/socketInstance';

type SocketEvent = {
  event: string;
  handler: Function;
};

interface IUseSocketProps {
  roomName: string;
  socketEvents: SocketEvent[];
  isReady?: boolean;
  userName: string;
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

  const emitEvent = useCallback((event: string, data?: any) => {
    socketInstance.emit(event, data);
  }, []);

  useEffect(() => {
    const handleSocketEvents = () => {
      if (isReady && roomName) {
        socketInstance.on('connect', () => {
          // console.log('connected');
        });

        socketInstance.emit('joinChat', userName);

        socketInstance.on('error', (err) => {
          console.log({ err });
        });

        // Add socket event listeners
        socketEvents.forEach(({ event, handler }) => {
          const fullEventName = event;
          socketInstance.on(fullEventName, socketEventHandler(handler));
        });

        return () => {
          // Remove socket event listeners
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
