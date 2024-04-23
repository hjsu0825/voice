let audioContext = new AudioContext({ sampleRate: 44100, numberOfChannels: 1 });
let micStream;
let jungle;
let effectActive = false;

window.onload = () => {
    audioContext = new AudioContext();
    setupMicrophone();
};

async function setupMicrophone() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStream = audioContext.createMediaStreamSource(stream);
        setupJungle();
    } catch (error) {
        console.error('마이크 오류 발생', error);
    }
}

function setupJungle() {
    jungle = new Jungle(audioContext);
    micStream.connect(jungle.input);
    jungle.output.connect(audioContext.destination);
    effectActive = true;
}

function changePitch(type) {
    if (type === 'off') {
        if (effectActive) {
            jungle.output.disconnect();
            micStream.disconnect();
            micStream.connect(audioContext.destination);
            effectActive = false;
        }
    } else {
        if (!effectActive) {
            micStream.disconnect();
            micStream.connect(jungle.input);
            jungle.output.connect(audioContext.destination);
            effectActive = true;
        }

        const pitchRatio = type === 'high' ? 1.5 : 0.5;
        jungle.setPitchOffset(pitchRatio);
    }
}