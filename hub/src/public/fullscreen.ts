declare global {
  interface Element {
    msRequestFullscreen?(): void;
    mozRequestFullScreen?(): void;
    webkitRequestFullscreen?(): void;
  }
}

export const enterFullscreen = () => {
  const root = document.documentElement;

  if (root.requestFullscreen) {
    root.requestFullscreen();
  } else if (root.webkitRequestFullscreen) {
    root.webkitRequestFullscreen();
  } else if (root.msRequestFullscreen) {
    root.msRequestFullscreen();
  } else if (root.mozRequestFullScreen) {
    root.mozRequestFullScreen();
  }
};
