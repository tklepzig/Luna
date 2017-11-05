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
        this.executeSocketCommand("keyboard-pressKey", key, modifier);
    }

    public sendMouseClick(button: MouseButton) {
        switch (button) {
            case MouseButton.Left:
                this.executeSocketCommand("mouse-leftClick");
                break;
            case MouseButton.Right:
                this.executeSocketCommand("mouse-rightClick");
                break;
            case MouseButton.Middle:
                this.executeSocketCommand("mouse-middleClick");
                break;
        }
    }

    public sendMouseMove(offset: { x: number, y: number }) {
        this.executeSocketCommand("mouse-move", offset);
    }

    public sendMouseWheel(direction: MouseWheelDirection, delta: number) {
        switch (direction) {
            case MouseWheelDirection.Vertical:
                this.executeSocketCommand("mouse-wheel", delta);
                break;
            case MouseWheelDirection.Horizontal:
                this.executeSocketCommand("mouse-hWheel", delta);
                break;
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

    private executeSocketCommand(event: string, ...args: any[]) {
        socketIoServer.emit(event, this.connectionId, ...args);

        // this is waaaaay tooooo slooooow...
        // --> find another way, e.g. check if the current *sent* command was successful
        // const pingTimeout = setTimeout(() => {
        //     socketIoServer.close();
        //     socketIoServer.connect();
        //     socketIoServer.emit(event, this.connectionId, ...args);
        // }, 1000);

        // socketIoServer.emit("ping", () => {
        //     clearTimeout(pingTimeout);
        //     socketIoServer.emit(event, this.connectionId, ...args);
        // });
    }
}

export default new Luna();
