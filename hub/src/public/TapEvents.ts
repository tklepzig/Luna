/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO convert to hook, get rid of any

export interface Point {
  x: number;
  y: number;
}

class TapEvents {
  public tapDown: string;
  public tapMove: string;
  public tapUp: string;
  public getTouchCount!: (e: any) => number;
  public getTapPosition!: (e: any) => Point;
  public getPinchZoomDistance!: (e: any) => number | undefined;
  public getPinchZoomCenter!: (e: any) => Point | undefined;

  constructor() {
    this.tapDown = this.deviceSupportsTouchEvents()
      ? "onTouchStart"
      : "onMouseDown";
    this.tapUp = this.deviceSupportsTouchEvents() ? "onTouchEnd" : "onMouseUp";
    this.tapMove = this.deviceSupportsTouchEvents()
      ? "onTouchMove"
      : "onMouseMove";

    if (this.deviceSupportsTouchEvents()) {
      this.initForTouchDevice();
    } else {
      this.initForDesktop();
    }
  }

  private deviceSupportsTouchEvents() {
    return "ontouchstart" in window;
  }

  private initForDesktop() {
    this.getTapPosition = (e: any) => ({
      x: e.pageX,
      y: e.pageY,
    });
    this.getTouchCount = () => 1;

    this.getPinchZoomDistance = () => 0;

    this.getPinchZoomCenter = (e: any) => ({
      x: e.pageX,
      y: e.pageY,
    });
  }

  private getTouchPositions(e: any) {
    const touches =
      e.targetTouches.length > 0 ? e.targetTouches : e.changedTouches;

    const touchPositions = [];

    for (const touch of touches) {
      touchPositions.push({ x: touch.pageX, y: touch.pageY });
    }

    return touchPositions;
  }

  private initForTouchDevice() {
    this.getTapPosition = (e: any) => {
      const touches =
        e.targetTouches.length > 0 ? e.targetTouches[0] : e.changedTouches[0];

      const { pageX: x, pageY: y } = touches;
      return { x, y };
    };
    this.getTouchCount = (e: any) => e.touches.length;

    this.getPinchZoomDistance = (e: any) => {
      const touchPositions = this.getTouchPositions(e);
      if (touchPositions.length === 2) {
        const dx = Math.abs(touchPositions[0].x - touchPositions[1].x);
        const dy = Math.abs(touchPositions[0].y - touchPositions[1].y);

        // pythagoras...
        return Math.sqrt(dx * dx + dy * dy);
      }
    };

    this.getPinchZoomCenter = (e: any) => {
      const touchPositions = this.getTouchPositions(e);
      if (touchPositions.length === 2) {
        const dx = Math.abs(touchPositions[0].x - touchPositions[1].x);
        const dy = Math.abs(touchPositions[0].y - touchPositions[1].y);

        return {
          x: Math.min(touchPositions[0].x, touchPositions[1].x) + dx / 2,
          y: Math.min(touchPositions[0].y, touchPositions[1].y) + dy / 2,
        };
      }
    };
  }
}

export const tapEvents = new TapEvents();
