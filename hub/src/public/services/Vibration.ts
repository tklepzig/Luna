class Vibration {
    public vibrate(duration: number = 20) {
        const navigator: any = window.navigator;

        navigator.vibrate = navigator.vibrate
            || navigator.webkitVibrate
            || navigator.mozVibrate
            || navigator.msVibrate;

        if (navigator.vibrate) {
            navigator.vibrate(duration);
        }
    }
}

export default new Vibration();
