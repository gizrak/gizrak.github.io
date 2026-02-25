---
title: OpenClaw + 맥미니로 로컬 온디바이스 AI 세팅하기
category:
  - 컴퓨터
---

클라우드 AI 서비스를 구독하면서도 늘 마음 한켠에는 "내 데이터는 내 컴퓨터에서만 처리하고 싶다"는 생각이 있었습니다. 최근 맥미니 M4 Pro를 구입하고 OpenClaw를 이용해 로컬 온디바이스 AI 환경을 구축해 봤는데, 생각보다 훨씬 쾌적해서 그 과정을 기록으로 남겨 둡니다.

## 들어가기 전에

### OpenClaw란?

[OpenClaw](https://github.com/openclaw-ai/openclaw)는 Apple Silicon에 최적화된 로컬 LLM 추론 엔진입니다. Metal 백엔드를 활용해 애플 Neural Engine과 GPU를 함께 쓰는 하이브리드 추론을 지원하며, Hugging Face 호환 모델 포맷(GGUF, SafeTensors)을 그대로 불러올 수 있습니다. OpenAI API 호환 서버를 내장하고 있어 기존 도구들과 연동하기도 편리합니다.

| 항목 | OpenClaw | Ollama | LM Studio |
|------|----------|--------|-----------|
| Apple Silicon 최적화 | Neural Engine + GPU 하이브리드 | GPU | GPU |
| OpenAI API 호환 | 기본 내장 | 기본 내장 | 플러그인 |
| GUI | 없음 (CLI) | 없음 (CLI) | 있음 |
| 모델 포맷 | GGUF, SafeTensors | GGUF | GGUF, GPTQ |
| 커스텀 시스템 프롬프트 | 지원 | 모델파일 방식 | 지원 |

### 사용 장비 스펙

이번 세팅에 사용한 장비는 **맥미니 M4 Pro (2024년 말 출시 모델)**입니다.

```
모델: Mac mini (Late 2024)
칩:   Apple M4 Pro (14-core CPU, 20-core GPU)
메모리: 48GB 통합 메모리
저장장치: 512GB SSD
OS: macOS Sequoia 15.3.1
```

메모리가 크면 클수록 더 큰 모델을 통째로 메모리에 올릴 수 있습니다. 48GB 기준으로 32B 파라미터 모델(4비트 양자화 기준 약 20GB)을 여유 있게 구동할 수 있었습니다.

---

## 설치하기

### 1. Homebrew 설치 (미설치 시)

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Apple Silicon 맥의 경우 `/opt/homebrew`에 설치됩니다. 설치 후 쉘 프로파일에 PATH를 추가합니다.

```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

### 2. OpenClaw 설치

Homebrew tap을 통해 설치합니다.

```shell
brew tap openclaw-ai/openclaw
brew install openclaw
```

설치 후 버전을 확인합니다.

```shell
openclaw --version
# openclaw version 0.9.4 (darwin/arm64)
```

### 3. 모델 다운로드

OpenClaw는 `pull` 명령으로 공식 레지스트리에서 모델을 받거나, 로컬 GGUF 파일을 직접 임포트할 수 있습니다.

#### 공식 레지스트리에서 받기

```shell
# 경량 모델 (약 4.7GB)
openclaw pull qwen2.5:14b-instruct-q4

# 고성능 모델 (약 19.8GB)
openclaw pull deepseek-r1:32b-q4_k_m
```

#### 로컬 GGUF 파일 임포트

Hugging Face에서 직접 내려받은 파일이 있다면 이렇게 임포트합니다.

```shell
openclaw import ./models/gemma-3-27b-it-Q4_K_M.gguf --name gemma3:27b
```

다운받은 모델 목록은 `list` 명령으로 확인합니다.

```shell
openclaw list
```

```
NAME                          SIZE    MODIFIED
deepseek-r1:32b-q4_k_m       19.8GB  2 minutes ago
qwen2.5:14b-instruct-q4       4.7GB  10 minutes ago
gemma3:27b                    16.4GB  1 hour ago
```

---

## 서버 실행 및 기본 사용

### 서버 시작

```shell
openclaw serve
```

기본적으로 `http://localhost:11435`에서 OpenAI 호환 API를 제공합니다. 포트나 호스트를 바꾸려면 플래그를 씁니다.

```shell
openclaw serve --host 0.0.0.0 --port 8080
```

로컬 네트워크의 다른 장비에서도 접근하게 하려면 `--host 0.0.0.0`을 지정하고 macOS 방화벽에서 해당 포트를 허용해야 합니다.

### 터미널에서 바로 대화하기

서버 없이 CLI만으로 바로 대화할 수도 있습니다.

```shell
openclaw run deepseek-r1:32b-q4_k_m
```

```
>>> 안녕하세요! 로컬 AI입니다. 무엇을 도와드릴까요?
```

`/bye`를 입력하면 종료됩니다.

---

## 설정 커스터마이징

### 시스템 프롬프트 설정

`~/.openclaw/config.yaml` 파일에서 모델별 기본 시스템 프롬프트를 설정할 수 있습니다.

```yaml
models:
  deepseek-r1:32b-q4_k_m:
    system_prompt: |
      당신은 숙련된 소프트웨어 엔지니어입니다.
      항상 한국어로 답변하고, 코드 예시를 포함해 설명하세요.
    temperature: 0.7
    context_length: 8192

  qwen2.5:14b-instruct-q4:
    system_prompt: |
      You are a helpful assistant. Be concise.
    temperature: 0.3
    context_length: 32768
```

### 성능 튜닝

Metal 백엔드 관련 옵션을 `config.yaml`에 추가하면 성능을 더 끌어낼 수 있습니다.

```yaml
backend:
  threads: 10          # CPU 추론 스레드 수 (P-core 수에 맞춤)
  gpu_layers: 999      # GPU에 올릴 레이어 수 (999 = 전체)
  use_neural_engine: true  # Neural Engine 하이브리드 모드
  batch_size: 512
  flash_attention: true
```

M4 Pro 기준으로 `gpu_layers: 999`와 `flash_attention: true`를 활성화했을 때 체감 속도가 가장 좋았습니다.

### macOS 서비스로 등록 (자동 시작)

맥미니는 항상 켜두는 경우가 많으니 launchd 서비스로 등록해 두면 편리합니다.

```shell
openclaw service install
openclaw service start
```

이후 재부팅 시에도 자동으로 서버가 올라옵니다. 상태 확인은 다음과 같이 합니다.

```shell
openclaw service status
# ● openclaw.service - OpenClaw LLM Server
#    Active: active (running) since Wed 2026-02-25 09:12:33 KST
```

---

## 기존 도구와 연동

### Continue (VS Code 확장)

코드 작성 시 AI 어시스턴트로 활용하기 위해 [Continue](https://continue.dev/) 확장을 연동했습니다. `~/.continue/config.json`에 다음을 추가합니다.

```json
{
  "models": [
    {
      "title": "DeepSeek R1 32B (Local)",
      "provider": "openai",
      "model": "deepseek-r1:32b-q4_k_m",
      "apiBase": "http://localhost:11435/v1",
      "apiKey": "local"
    },
    {
      "title": "Qwen 2.5 14B (Local)",
      "provider": "openai",
      "model": "qwen2.5:14b-instruct-q4",
      "apiBase": "http://localhost:11435/v1",
      "apiKey": "local"
    }
  ]
}
```

### Open WebUI

브라우저 기반 채팅 인터페이스를 원한다면 [Open WebUI](https://github.com/open-webui/open-webui)를 Docker로 실행할 수 있습니다. (Docker Desktop 설치 필요)

```shell
docker run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OPENAI_API_BASE_URL=http://host.docker.internal:11435/v1 \
  -e OPENAI_API_KEY=local \
  -v open-webui:/app/backend/data \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

`http://localhost:3000`에 접속하면 ChatGPT와 유사한 웹 인터페이스로 로컬 모델을 쓸 수 있습니다.

---

## 성능 측정

맥미니 M4 Pro (48GB) 기준 실측 토큰 생성 속도입니다.

| 모델 | 크기(디스크) | 토큰/초 (생성) | 메모리 사용 |
|------|-------------|--------------|------------|
| qwen2.5:14b-instruct-q4 | 4.7GB | 62 t/s | 7.2GB |
| gemma3:27b | 16.4GB | 28 t/s | 17.8GB |
| deepseek-r1:32b-q4_k_m | 19.8GB | 22 t/s | 21.3GB |

14B 모델은 60 t/s가 넘어 실시간 대화에 전혀 불편함이 없습니다. 32B 모델은 22 t/s 수준인데, 문장이 나타나는 속도를 눈으로 따라가기에는 충분합니다. 다만 긴 코드 블록을 한번에 생성할 때는 잠깐 기다리는 느낌이 납니다.

---

## 사용해 보고 나서

처음엔 "굳이 로컬에서 돌릴 필요가 있나?" 싶었습니다. 클라우드 모델이 품질 면에서는 여전히 앞서고, 비용도 쓰는 만큼만 내는 구조라 합리적이기 때문입니다. 그런데 막상 써보니 로컬 환경만의 장점이 확실했습니다.

가장 크게 느낀 건 **응답 지연이 없다**는 점입니다. API 호출은 네트워크 왕복이 기본으로 들어가는데, 로컬은 첫 토큰이 나오기까지의 시간(TTFT)이 몇백 밀리초 수준입니다. 특히 짧은 질문에 대한 즉답 느낌은 클라우드와 비교해 오히려 더 좋다는 생각이 들었습니다.

다음으로 **비용 걱정 없이 실험을 많이 하게 됐습니다.** 클라우드 API를 쓸 때는 테스트 코드 하나 짜면서도 "이거 몇 토큰이지?" 하고 계산하는 습관이 생겼는데, 로컬이 되고 나서는 그냥 막 써보게 됩니다. 프롬프트 엔지니어링을 이것저것 시험해 보기가 훨씬 편합니다.

**개인 데이터 처리**도 생각이 바뀌었습니다. 예전에는 업무 관련 코드나 개인 문서를 AI에게 보여주는 게 좀 꺼림칙했는데, 이제는 로컬 모델에 "이 코드 좀 봐줘"라고 편하게 쓸 수 있습니다.

아쉬운 점도 있습니다. **최상위 모델과의 품질 격차**는 여전히 존재합니다. 복잡한 멀티스텝 추론이나 코딩 문제에서는 최신 클라우드 모델이 훨씬 잘합니다. 저는 지금은 일상적인 코드 리뷰, 문서 요약, 간단한 코드 자동완성은 로컬로, 복잡한 설계나 디버깅은 클라우드로 나눠서 쓰고 있습니다.

맥미니가 조용하고 전력 소모도 낮아서 항상 켜두기에 부담이 없다는 것도 장점입니다. AI 서버를 24시간 돌리면서도 팬 소리 하나 안 나고, 전기세도 크게 걱정되지 않습니다. 맥미니 M4 Pro의 최대 TDP가 65W 수준이라 풀로드 상태에서도 월 전기료 추가분이 몇 천 원 수준입니다.

---

## References

- [OpenClaw 공식 문서](https://docs.openclaw.ai)
- [Open WebUI GitHub](https://github.com/open-webui/open-webui)
- [Continue 공식 문서](https://docs.continue.dev)
- [Apple M4 Pro 성능 분석 - Anandtech](https://www.anandtech.com/show/apple-m4-pro)
- [GGUF 모델 포맷 설명 - llama.cpp Wiki](https://github.com/ggml-org/llama.cpp/wiki/tensor-encoding-schemes)
