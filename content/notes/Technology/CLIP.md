---
title: CLIP (Contrastive Language-Image Pre-Training)
category:
  - Technology
---

> OpenAI에서 개발한 멀티모달 신경망 모델
> 이미지 인코더와 텍스트 인코더를 공동으로 훈련하여 이미지-텍스트 공유 임베딩 공간을 학습

## 목적

- 주어진 이미지와 텍스트 캡션이 얼마나 잘 어울리는지 예측
- 특정 작업에 직접 최적화하지 않고도 자연어로 지시 가능 (Zero-shot)
- 주어진 이미지에 가장 관련 있는 텍스트 스니펫 예측

## 훈련 방법

- 다양한 (이미지, 텍스트) 쌍으로 훈련
- 올바른 이미지-캡션 벡터 쌍 간의 **코사인 유사도** 최대화
- 잘못된 쌍 간의 유사도 점수 최소화
- 이미지와 텍스트가 의미적으로 관련된 공유 임베딩 공간 생성이 목표

## 제로샷 (Zero-shot) 기능

- GPT-2/GPT-3의 Zero-shot 기능과 유사
- 명시적인 파인튜닝 없이 새로운 작업에 일반화
- 레이블된 예제 없이 이미지에 대한 관련 텍스트 스니펫 예측

## 사용법

### 설치

```bash
pip install torch pillow
pip install ftfy regex tqdm
pip install git+https://github.com/openai/CLIP.git
```

### Python 코드 예시

```python
import torch
import clip
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

image = preprocess(Image.open("CLIP.png")).unsqueeze(0).to(device)
text = clip.tokenize(["다이어그램", "개", "고양이"]).to(device)

with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)

    logits_per_image, logits_per_text = model(image, text)
    probs = logits_per_image.softmax(dim=-1).cpu().numpy()

print("레이블 확률:", probs)
```

## API

- `clip.available_models()` - 사용 가능한 모델 목록
- `clip.load(name, device=..., jit=False)` - 모델 로드
- `model.encode_image(image: Tensor)` - 이미지 인코딩
- `model.encode_text(text: Tensor)` - 텍스트 인코딩

## 관련 노트

- [신경망 (Neural Network)](/notes/Neural_Network/) - CNN/RNN 기반 신경망 구조
- [NLP](/notes/NLP/) - 텍스트 임베딩 기법 (Word2Vec, Transformer 등)
- [Fine Tuning](/notes/Fine_Tuning/) - 사전학습 모델 파라미터 조정
- [KILT](/notes/KILT/) - 지식 집약적 언어 작업 (RAG 포함)

## 참고

- [공식 CLIP GitHub](https://github.com/openai/CLIP)
