class Fullscreen {
    isSupported() {
        return document.mozFullScreenEnabled
            || document.fullscreenEnabled
            || document.webkitFullscreenEnabled
            || document.msFullscreenEnabled;
    }

    isFullscreen() {
        const fullScreenElement = document.webkitFullscreenElement || document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        return fullScreenElement != null;
    }

    request(element) {
        if (this.isSupported()) {
            if (element.requestFullscreen)
                element.requestFullscreen();

            else if (element.webkitRequestFullscreen)
                element.webkitRequestFullscreen();

            else if (element.msRequestFullscreen)
                element.msRequestFullscreen();

            else if (element.mozRequestFullScreen)
                element.mozRequestFullScreen();
        }
    }

    exit() {
        if (this.isSupported()) {
            if (document.exitFullscreen)
                document.exitFullscreen();

            else if (document.webkitExitFullscreen)
                document.webkitExitFullscreen();

            else if (document.msExitFullscreen)
                document.msExitFullscreen();

            else if (document.mozCancelFullScreen)
                document.mozCancelFullScreen();
        }
    }

    toggle(element) {
        if (!this.isFullscreen())
            this.request(element);
        else
            this.exit();
    }
}

export default new Fullscreen();
