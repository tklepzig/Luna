import * as io from "socket.io-client";

class SocketIoService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io();

    }
    public emit(event: string, ...args: any[]) {
        return this.socket.emit(event, ...args);
    }

    public on(event: string, fn: (...args: any[]) => void) {
        return this.socket.on(event, fn);
    }

    public close() {
        this.socket.close();
    }

    public connect() {
        this.socket.connect();
    }
}

export default new SocketIoService();
