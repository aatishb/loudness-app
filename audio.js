let context;

function startAudio() {
  if (!context) {
    context = new AudioContext();
  }

}

startAudio();

function tone(freq, amp) {
    var T = context.currentTime;

    var osc = context.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    var gain = context.createGain();
    osc.connect(gain);

    gain.gain.setValueAtTime(0, T);
    gain.gain.linearRampToValueAtTime(amp, T + 0.1);
    gain.connect(context.destination);

    osc.start(T);
    setTimeout((fadeOut(gain,T)), 900);
    osc.stop(T + 1);
}

function fadeOut(gain,T) {
  gain.gain.linearRampToValueAtTime(0, T + 1);
}