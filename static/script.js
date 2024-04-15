let audioContext;
let audioSource;
let audioBuffer;
let pitchShifter;

window.onload = () => {
    audioContext = new AudioContext();
};

async function fetchAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

function changePitch(type) {
    if (pitchShifter) {
        pitchShifter.disconnect();
    }
    
    pitchShifter = new PitchShifter(audioContext, audioBuffer, {
        pitch: type === 'high' ? 1.5 : type === 'low' ? 0.5 : 1.0
    });

    pitchShifter.connect(audioContext.destination);
    pitchShifter.start();
}

class PitchShifter {
    constructor(context, buffer, options) {
        this.context = context;
        this.source = this.context.createBufferSource();
        this.source.buffer = buffer;
        this.gainNode = this.context.createGain();
        this.pitch = options.pitch;
        
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.gainNode.gain.value = this.pitch;
    }

    start() {
        this.source.start();
    }

    disconnect() {
        this.source.stop();
        this.source.disconnect();
    }
}
