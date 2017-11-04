import * as React from "react";

export interface ITouchpadProps {
}

export default class Touchpad extends React.Component<ITouchpadProps, any> {
    private clickPoint: { x: any; y: any; };
    private touchCount: number;
    private downPoint?: { x: any; y: any; };
    private firstMove: boolean;
    private getTouchCount: (e: any) => any;
    private getMousePosition: (e: any) => { x: any; y: any; };
    private moveEvent: string;
    private upEvent: string;
    private downEvent: string;

    constructor(props: ITouchpadProps) {
        super(props);

        this.tapDown = this.tapDown.bind(this);
        this.tapUp = this.tapUp.bind(this);
        this.tapMove = this.tapMove.bind(this);

        this.downEvent = this.deviceSupportsTouchEvents() ? "onTouchStart" : "onMouseDown";
        this.upEvent = this.deviceSupportsTouchEvents() ? "onTouchEnd" : "onMouseUp";
        this.moveEvent = this.deviceSupportsTouchEvents() ? "onTouchMove" : "onMouseMove";

        if (this.deviceSupportsTouchEvents()) {
            this.getMousePosition = (e: any) => ({
                x: e.originalEvent.targetTouches[0].pageX,
                y: e.originalEvent.targetTouches[0].pageY
            });

            this.getTouchCount = (e: any) => e.originalEvent.touches.length;
        } else {
            this.getMousePosition = (e: any) => ({
                x: e.pageX, y: e.pageY
            });

            this.getTouchCount = (e: any) => 1;
        }
    }

    public render() {
        const downEventAttribute = { [this.downEvent]: this.tapDown };
        const upEventAttribute = { [this.upEvent]: this.tapUp };
        const moveEventAttribute = { [this.moveEvent]: this.tapMove };

        return (
            <div className="touchpad" {...downEventAttribute} {...upEventAttribute} {...moveEventAttribute} />
        );
    }

    private tapDown(e: any) {
        this.touchCount = this.getTouchCount(e);
        const pos = this.getMousePosition(e);
        this.downPoint = this.clickPoint = {
            x: pos.x,
            y: pos.y
        };
        this.firstMove = true;

        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    private tapUp(e: any) {
        if (this.clickPoint !== undefined && this.downPoint !== undefined
            && Math.abs(this.clickPoint.x - this.downPoint.x) < 2
            && Math.abs(this.clickPoint.y - this.downPoint.y) < 2) {
            switch (this.touchCount) {
                case 1:
                    // socket.emit("mouse-leftClick", id);
                    break;
                case 2:
                    // socket.emit("mouse-rightClick", id);
                    break;
                case 3:
                    // socket.emit("mouse-middleClick", id);
                    break;
            }
        }

        this.downPoint = undefined;

        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    private tapMove(e: any) {
        if (this.downPoint === undefined) {
            return true;
        }

        const pos = this.getMousePosition(e);

        const offset = {
            x: pos.x - this.downPoint.x,
            y: pos.y - this.downPoint.y
        };

        if (this.firstMove) {
            offset.x = offset.x < 0 ? -1 : 1;
            offset.y = offset.y < 0 ? -1 : 1;
            this.firstMove = false;
        }

        this.downPoint = {
            x: pos.x,
            y: pos.y
        };

        switch (this.touchCount) {
            case 1:

                if (Math.abs(offset.x) > 2) {
                    offset.x *= (offset.x.toString().length + 2);
                }
                if (Math.abs(offset.y) > 2) {
                    offset.y *= (offset.y.toString().length + 2);
                }

                // socket.emit('mouse-move', id, offset);

                break;
            case 2:
                let delta;
                if (Math.abs(offset.x) > 4) {
                    delta = Math.floor(Math.abs(offset.x) / 2) * 60;
                    if (offset.x > 0) {
                        delta *= -1;
                    }

                    // socket.emit("mouse-hWheel", id, delta);
                } else {
                    delta = Math.floor(Math.abs(offset.y) / 2) * 60;
                    if (offset.y > 0) {
                        delta *= -1;
                    }

                    // socket.emit("mouse-wheel", id, delta);
                }

                break;
        }

        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    private deviceSupportsTouchEvents() {
        return "ontouchstart" in window;
    }
}
