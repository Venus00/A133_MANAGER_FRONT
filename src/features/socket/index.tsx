import { io } from 'socket.io-client';

const URL = 'http://192.168.10.126:3001';

export const socket = io(URL,{
    autoConnect:false
});