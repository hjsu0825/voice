document.addEventListener('DOMContentLoaded', function() {
    var statusText = document.getElementById('status');

    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        // AudioContext가 존재하면, Web Audio API가 지원됨
        statusText.textContent = '이 브라우저는 Web Audio API를 지원합니다.';
    } else {
        // AudioContext가 존재하지 않으면, Web Audio API가 지원되지 않음
        statusText.textContent = '이 브라우저는 Web Audio API를 지원하지 않습니다.';
    }
});
