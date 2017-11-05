class Fullscreen {
    public isFullscreenSupported() {
        const document: any = window.document;

        return document.mozFullScreenEnabled
            || document.fullscreenEnabled
            || document.webkitFullscreenEnabled
            || document.msFullscreenEnabled;
    }
    public isFullscreen() {
        const document: any = window.document;
        const fullScreenElement = document.webkitFullscreenElement
            || document.fullscreenElement
            || document.mozFullScreenElement
            || document.msFullscreenElement;

        return fullScreenElement !== null;
    }

    public request(element: any) {
        if (this.isFullscreenSupported) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
        }
    }

    public exit() {
        if (this.isFullscreenSupported) {
            const document: any = window.document;

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
        }
    }

    public toggle(element: any) {
        if (!this.isFullscreen()) {
            this.request(element);
        } else {
            this.exit();
        }
    }
}

export default new Fullscreen();
