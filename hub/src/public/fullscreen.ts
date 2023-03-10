declare global {
  interface Element {
    msRequestFullscreen?(): void;
    mozRequestFullScreen?(): void;
    webkitRequestFullscreen?(): void;
  }
}

export const enterFullscreen = () => {
  const body = document.body;

  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) {
    body.msRequestFullscreen();
  } else if (body.mozRequestFullScreen) {
    body.mozRequestFullScreen();
  }
};
