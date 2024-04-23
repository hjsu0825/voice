import sounddevice as sd
import torch
import torchaudio
from model import StarGANVCModel

# 모델 초기화
model = StarGANVCModel()
model.load_weights('epoch_00100.pth')
model.eval()

def audio_callback(indata, outdata, frames, time, status):
    if status:
        print(status)
    waveform = torch.tensor(indata[:, 0], dtype=torch.float32).unsqueeze(0).unsqueeze(1)
    with torch.no_grad():
        converted_waveform = model.convert_voice(waveform, target_voice_id=1)
    outdata[:] = converted_waveform.numpy().reshape(-1, 1)

# 오디오 스트림 설정
device_info = sd.query_devices(kind='input')
samplerate = int(device_info['default_samplerate'])

stream = sd.Stream(
    samplerate=samplerate,
    blocksize=int(samplerate * 0.5),  # 0.5초 블록
    dtype='float32',
    channels=1,
    callback=audio_callback
)

# 스트림 실행
with stream:
    print("스트림 시작. 마이크로 말해보세요.")
    input()  # 엔터를 누르면 스트림이 중지됩니다.
