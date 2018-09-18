import * as React from "react";
import luna, { MouseButton, MouseWheelDirection } from "../services/Luna";

export default class Touchpad extends React.Component {
    private clickPoint: { x: any; y: any; };
    private touchCount: number;
    private downPoint?: { x: any; y: any; };
    private firstMove: boolean;
    private getTouchCount: (e: any) => any;
    private getMousePosition: (e: any) => { x: any; y: any; };
    private moveEvent: string;
    private upEvent: string;
    private downEvent: string;

    constructor() {
        super();

        this.tapDown = this.tapDown.bind(this);
        this.tapUp = this.tapUp.bind(this);
        this.tapMove = this.tapMove.bind(this);

        this.downEvent = this.deviceSupportsTouchEvents() ? "onTouchStart" : "onMouseDown";
        this.upEvent = this.deviceSupportsTouchEvents() ? "onTouchEnd" : "onMouseUp";
        this.moveEvent = this.deviceSupportsTouchEvents() ? "onTouchMove" : "onMouseMove";

        if (this.deviceSupportsTouchEvents()) {
            this.getMousePosition = (e: any) => ({
                x: e.targetTouches[0].pageX,
                y: e.targetTouches[0].pageY
            });

            this.getTouchCount = (e: any) => e.touches.length;
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
                    luna.sendMouseClick(MouseButton.Left);
                    break;
                case 2:
                    luna.sendMouseClick(MouseButton.Right);
                    break;
                case 3:
                    luna.sendMouseClick(MouseButton.Middle);
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

                luna.sendMouseMove(offset);

                break;
            case 2:
                let delta;
                if (Math.abs(offset.x) > 4) {
                    delta = Math.floor(Math.abs(offset.x) / 2) * 60;
                    if (offset.x > 0) {
                        delta *= -1;
                    }

                    luna.sendMouseWheel(MouseWheelDirection.Horizontal, delta);
                } else {
                    delta = Math.floor(Math.abs(offset.y) / 2) * 60;
                    if (offset.y > 0) {
                        delta *= -1;
                    }

                    luna.sendMouseWheel(MouseWheelDirection.Vertical, delta);
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