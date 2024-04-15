let audioContext = new AudioContext({ sampleRate: 44100 });
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
        console.error('Error accessing the microphone', error);
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

        const pitchRatio = type === 'high' ? 1.5 : 0.5; // 'high' 또는 'low'에 해당하는 피치 비율을 설정
        jungle.setPitchOffset(pitchRatio);
    }
}
