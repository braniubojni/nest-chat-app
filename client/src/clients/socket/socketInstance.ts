import { io } from "socket.io-client";

// const url: string = process.env.REACT_APP_SERVER_URL as string;
const url: string = process.env.REACT_APP_SERVER_URL as string;

const socketInstance = io(url, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionDelay: 500,
});

export default socketInstance;
