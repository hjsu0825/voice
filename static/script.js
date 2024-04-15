// let audioContext;
// let pitchShifter;
// let micStream;

// window.onload = () => {
//     audioContext = new AudioContext();
//     setupMicrophone();
// };

// async function setupMicrophone() {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         micStream = audioContext.createMediaStreamSource(stream);
//         setupPitchShifter();
//     } catch (error) {
//         console.error('Error accessing the microphone', error);
//     }
// }

// function setupPitchShifter() {
//     pitchShifter = audioContext.createGain(); // Default gain node to start with
//     micStream.connect(pitchShifter);
//     pitchShifter.connect(audioContext.destination);
// }

// function changePitch(type) {
//     const pitchRatio = type === 'high' ? 1.5 : type === 'low' ? 0.5 : 1.0;
//     if (pitchShifter) {
//         pitchShifter.gain.value = pitchRatio;
//     }
// }

// static/script.js
let audioContext;
let micStream;
let pitchProcessor;
let pitchNode;

window.onload = () => {
    audioContext = new AudioContext();
    setupMicrophone();
};

async function setupMicrophone() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStream = audioContext.createMediaStreamSource(stream);
        setupPitchProcessor();
    } catch (error) {
        console.error('Error accessing the microphone', error);
    }
}

function setupPitchProcessor() {
    pitchNode = new PitchProcessor({audioContext: audioContext});
    pitchProcessor = audioContext.createScriptProcessor(4096, 1, 1);
    micStream.connect(pitchProcessor);
    pitchProcessor.connect(pitchNode.input);
    pitchNode.output.connect(audioContext.destination);
    pitchNode.onaudioprocess = function(data) {
        pitchNode.transpose = pitchNode.transpose; // You can modify this value based on buttons
    };
}

function changePitch(type) {
    const semitones = type === 'high' ? 12 : type === 'low' ? -12 : 0;
    pitchNode.transpose = semitones;
}
