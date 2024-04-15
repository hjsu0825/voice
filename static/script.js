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

let audioContext;
let micStream;
let jungle;

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
}

function changePitch(type) {
    switch (type) {
        case 'high':
            jungle.setPitchOffset(2.0); // 이 값을 조정하여 피치를 높입니다.
            break;
        case 'low':
            jungle.setPitchOffset(0.5); // 이 값을 조정하여 피치를 낮춥니다.
            break;
        case 'normal':
            jungle.setPitchOffset(1.0); // 원래대로 복원
            break;
    }
}
