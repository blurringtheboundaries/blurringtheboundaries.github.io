/**
 * A quick musical sketch based on our current microbit lantern setup, trying out the built-in speaker on the microbit v2.
 */

// base octave: C3 = 130.81 Hz
const frequencies = [130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94];

const pinsArray = [AnalogPin.P0, AnalogPin.P1];
let pinValues = [0, 0];

function readAndMapPins() {
    for (let i = 0; i < pinsArray.length; i++) {
        pinValues[i] = Math.map(
            Math.constrain(pins.analogReadPin(pinsArray[i]), 100, 150),
            150,
            100,
            0,
            127
        );
    }
}

function playToneIfNeeded(pinIndex, tone) {
    if (pinValues[pinIndex] > 10) {
        music.stopAllSounds();
        music.play(music.tonePlayable(tone, music.beat(BeatFraction.Breve)), music.PlaybackMode.InBackground);
        music.setVolume(pinValues[pinIndex]);
        if (pinValues[0] > 10 && pinValues[1] > 10) {
            basic.pause(Math.map(pinValues[pinIndex], 0, 127, 20, 40));
        }
    }
}

input.onButtonPressed(Button.AB, function () {
    music.stopAllSounds();
    music.play(music.tonePlayable(784, music.beat(BeatFraction.Breve)), music.PlaybackMode.LoopingInBackground);
});

serial.redirectToUSB();
music.setBuiltInSpeakerEnabled(true);

loops.everyInterval(20, function () {
    if (input.buttonIsPressed(Button.A)) {
        readAndMapPins();
        playToneIfNeeded(0, frequencies[0]);
        playToneIfNeeded(1, frequencies[5]);
    } else {
        music.stopAllSounds();
    }
});

basic.forever(function () {
    // Forever loop if needed
});