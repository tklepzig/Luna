import socketIoServer from "./SocketIoService";

class Luna {
    private connectionId: string;

    constructor() {
        if (!localStorage.connectionId) {
            localStorage.connectionId = this.connectionId = this.makeid();
        } else {
            this.connectionId = localStorage.connectionId;
        }
    }

    private makeid() {
        let id = "";
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 6; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
    }

    private executeSocketCommand(action: (args: any) => void, args: any) {
        const pingTimeout = setTimeout(() => {
            socketIoServer.close();
            socketIoServer.connect();
            action(args);
        }, 1000);

        socketIoServer.emit("ping", () => {
            clearTimeout(pingTimeout);
            action(args);
        });
    }
}
