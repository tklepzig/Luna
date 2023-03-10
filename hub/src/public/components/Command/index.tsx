/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO get rid of any
import { HTMLAttributes } from "react";
import { Point, tapEvents } from "../../TapEvents";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  onTap?: () => void;
  type?: "submit" | "reset" | "button";
  className: string;
}
export const Command = ({
  onTap,
  className,
  type = "button",
  ...props
}: Props) => {
  // TODO useState!!!
  let cancel = false;
  let isDown = false;
  let downPoint: Point | undefined;

  const tapDown = (e: any) => {
    isDown = true;
    cancel = false;
    downPoint = tapEvents.getTapPosition(e);
  };

  const tapUp = () => {
    isDown = false;

    if (!cancel && onTap) {
      onTap();
    }
  };

  const mouseLeave = () => {
    isDown = false;
  };

  const tapMove = (e: any) => {
    if (!downPoint || !isDown) {
      return;
    }

    const dx = Math.abs(tapEvents.getTapPosition(e).x - downPoint.x);
    const dy = Math.abs(tapEvents.getTapPosition(e).y - downPoint.y);

    if (dx > 8 || dy > 8) {
      cancel = true;
    }
  };
  return (
    <button
      type={type}
      className={`command ${className}`}
      {...props}
      {...{ [tapEvents.tapDown]: tapDown }}
      {...{ [tapEvents.tapUp]: tapUp }}
      {...{ [tapEvents.tapMove]: tapMove }}
      onMouseLeave={mouseLeave}
    />
  );
};
