/**
 * A quick musical sketch based on our current microbit lantern setup, trying out the built-in speaker on the microbit v2.
 */


input.onButtonPressed(Button.AB, function () {
    music.stopAllSounds()
    music.play(music.tonePlayable(784, music.beat(BeatFraction.Breve)), music.PlaybackMode.LoopingInBackground)
})
let pin1 = 0
let pin0 = 0
serial.redirectToUSB()
music.setBuiltInSpeakerEnabled(true)
loops.everyInterval(20, function () {
    if (input.buttonIsPressed(Button.A)) {
        pin0 = Math.map(Math.constrain(pins.analogReadPin(AnalogPin.P0), 100, 150), 150, 100, 0, 127)
        pin1 = Math.map(Math.constrain(pins.analogReadPin(AnalogPin.P1), 100, 150), 150, 100, 0, 127)
        if (pin0 > 10) {
            music.stopAllSounds()
            music.play(music.tonePlayable(659, music.beat(BeatFraction.Breve)), music.PlaybackMode.InBackground)
            music.setVolume(pin0)
            if (pin0 > 10 && pin1 > 10) {
                basic.pause(Math.map(pin0, 0, 127, 20, 40))
            }
        }
        if (pin1 > 10) {
            music.stopAllSounds()
            music.play(music.tonePlayable(523, music.beat(BeatFraction.Breve)), music.PlaybackMode.InBackground)
            music.setVolume(pin1)
            if (pin0 > 10 && pin1 > 10) {
                basic.pause(Math.map(pin1, 0, 127, 20, 40))
            }
        }
    } else {
        music.stopAllSounds()
    }
})
basic.forever(function () {
	
})
