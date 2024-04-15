const audioContext = new AudioContext();
let micStream = null;
let sourceNode = null;
let pitchFilter = null;

// 마이크 스트림을 초기화하고 오디오 노드를 설정하는 함수
async function initAudio() {
    if (micStream === null) {
        try {
            micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            sourceNode = audioContext.createMediaStreamSource(micStream);
            pitchFilter = audioContext.createBiquadFilter();
            pitchFilter.type = 'lowshelf'; // 초기 필터 타입 설정
            sourceNode.connect(pitchFilter);
            pitchFilter.connect(audioContext.destination);
        } catch (error) {
            console.error('마이크 접근 실패:', error);
        }
    }
}

// 저음 변조 설정
document.getElementById('lowPitch').addEventListener('click', () => {
    pitchFilter.frequency.value = 200; // 주파수를 낮춤
    pitchFilter.gain.value = -15; // 게인을 줄여서 저음 효과
});

// 고음 변조 설정
document.getElementById('highPitch').addEventListener('click', () => {
    pitchFilter.frequency.value = 2000; // 주파수를 높임
    pitchFilter.gain.value = 15; // 게인을 늘려서 고음 효과
});

document.getElementById('reset').addEventListener('click', () => {
    pitchFilter.frequency.value = 0; // 주파수 초기화
    pitchFilter.gain.value = 0;      // 게인 초기화
});

initAudio(); // 오디오 시스템 초기화
