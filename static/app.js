const audioContext = new AudioContext();
let micStream = null;
let sourceNode = null;
let scriptNode = null;
let soundTouch = null;

async function initAudio() {
    try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        sourceNode = audioContext.createMediaStreamSource(micStream);
        scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
        soundTouch = new SoundTouch();

        scriptNode.onaudioprocess = function (audioProcessingEvent) {
            let inputBuffer = audioProcessingEvent.inputBuffer;
            let outputBuffer = audioProcessingEvent.outputBuffer;

            for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
                let inputData = inputBuffer.getChannelData(channel);
                let outputData = outputBuffer.getChannelData(channel);

                // 이곳에서 SoundTouchJS 라이브러리를 사용하여 피치를 조절
                let soundTouchFilter = new SimpleFilter(inputData, outputData, soundTouch);
                soundTouch.pitch = 1.5; // 피치 조절
                soundTouchFilter.process();
            }
        };

        sourceNode.connect(scriptNode);
        scriptNode.connect(audioContext.destination);
    } catch (error) {
        console.error('마이크 접근 실패:', error);
    }
}

document.getElementById('lowPitch').addEventListener('click', () => {
    soundTouch.pitch = 0.5; // 헬륨 목소리 효과를 위해 피치를 높임
});

document.getElementById('highPitch').addEventListener('click', () => {
    soundTouch.pitch = 1.5; // 헬륨 목소리 효과를 위해 피치를 높임
});

document.getElementById('reset').addEventListener('click', () => {
    soundTouch.pitch = 1.0; // 피치를 원래대로
});

window.addEventListener('load', initAudio);
