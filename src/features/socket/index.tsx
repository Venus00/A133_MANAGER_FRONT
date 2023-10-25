import { io } from 'socket.io-client';

const URL = `http://${window.location.hostname}:3001`;

export const socket = io(URL,{
    autoConnect:true
});