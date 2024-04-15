// static/script.js
let audioContext;
let pitchShifter;
let micStream;

window.onload = () => {
    audioContext = new AudioContext();
    setupMicrophone();
};

async function setupMicrophone() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStream = audioContext.createMediaStreamSource(stream);
        setupPitchShifter();
    } catch (error) {
        console.error('Error accessing the microphone', error);
    }
}

function setupPitchShifter() {
    pitchShifter = audioContext.createGain(); // Default gain node to start with
    micStream.connect(pitchShifter);
    pitchShifter.connect(audioContext.destination);
}

function changePitch(type) {
    const pitchRatio = type === 'high' ? 1.5 : type === 'low' ? 0.5 : 1.0;
    if (pitchShifter) {
        pitchShifter.gain.value = pitchRatio;
    }
}
