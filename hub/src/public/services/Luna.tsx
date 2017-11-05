import socketIoServer from "./SocketIoService";

export enum MouseButton {
    Left,
    Right,
    Middle
}

export enum MouseWheelDirection {
    Vertical,
    Horizontal
}

class Luna {
    private connectionId: string;

    constructor() {
        if (!localStorage.connectionId) {
            localStorage.connectionId = this.connectionId = this.makeid();
        } else {
            this.connectionId = localStorage.connectionId;
        }
    }

    public sendKeyPress(key: string, modifier?: string) {
        // executeSocketCommand(function(e) {
        //     socket.emit('keyboard-pressKey', id, e.key, e.modifiers);
        // }, { key: $(this).data('key'), modifiers: $(this).data("modifiers") });
    }

    public sendMouseClick(button: MouseButton) {
        // socket.emit("mouse-leftClick", id);
        // socket.emit("mouse-rightClick", id);
        // socket.emit("mouse-middleClick", id);
    }

    public sendMouseMove(offset: { x: number, y: number }) {
        // socket.emit('mouse-move', id, offset);
    }

    public sendMouseWheel(direction: MouseWheelDirection, delta: number) {
        // socket.emit("mouse-hWheel", id, delta);
        // socket.emit("mouse-wheel", id, delta);
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

export default new Luna();
