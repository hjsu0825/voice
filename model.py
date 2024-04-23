import torch

class StarGANVCModel(torch.nn.Module):
    def __init__(self):
        super(StarGANVCModel, self).__init__()
        # 모델 아키텍처 초기화

    def load_weights(self, weight_path):
        # 파일을 로드하여 'model' 키로 가중치 접근
        checkpoint = torch.load(weight_path, map_location=torch.device('cpu'))
        if 'model' in checkpoint:
            self.load_state_dict(checkpoint['model'])
        else:
            # 파일이 단순 가중치만 포함하는 경우
            self.load_state_dict(checkpoint)
