---
title: WebGPU
category:
  - Technology
---

> 웹 애플리케이션에서 로컬 디바이스의 GPU를 직접 접근·활용할 수 있게 해주는 차세대 웹 그래픽 API

## 개요

- 2017년부터 W3C에서 개발 시작
- 낮은 오버헤드 API 이점을 웹 브라우저 환경에 제공
- 이름에 "web"이 들어가지만 브라우저에 국한되지 않음 ([wgpu](https://github.com/gfx-rs/wgpu): Rust용 WebGPU)

### 배경 (WebGL 한계)

1. [OpenGL의 한계](https://blog.naver.com/dmatrix/221808847792) → Vulkan 등장 (저수준, 낮은 오버헤드)
2. 벤더별 고성능 API: DirectX (MS), Metal (Apple)
3. 웹 환경: WebGL → WebGPU로 진화

## WebGL vs WebGPU 비교

|                  | WebGL                          | WebGPU                          |
| ---------------- | ------------------------------ | ------------------------------- |
| 전역 상태        | Global State                   | Stateless API (파이프라인 기반) |
| 동기화           | Sync API                       | Async API (비동기 콜백)         |
| 컴퓨팅 셰이더    | vertex + fragment               | vertex + fragment + **compute** |
| 캔버스 처리      | Chrome 16개, Firefox 200개 제한 | 제한 없음                       |

### 개선 사항

- 모던 그래픽 카드 최적화 (그래픽 + 컴퓨팅)
- 멀티스레딩 지원으로 고성능
- 저수준 API로 GPU 세부 제어 가능
- 최신 보안 표준 적용

### Compute Shader 활용

WebGPU의 compute shader는 GPU에서 범용 계산 수행 가능:
- 머신러닝 추론 (WebLLM 등)
- 물리 시뮬레이션
- 과학 컴퓨팅

## 브라우저 내 AI/LLM 실습

- LLM: [WebLLM](https://webllm.mlc.ai/)
- Stable Diffusion: [WebSD](https://websd.mlc.ai/)

## 실습 자료

- [첫 번째 WebGPU 앱 만들기 (Google Codelab)](https://codelabs.developers.google.com/your-first-webgpu-app?hl=ko)
- [WebGPU Samples - Hello Triangle](https://webgpu.github.io/webgpu-samples/samples/helloTriangle)
- [MDN WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 관련 노트

- [Web](/notes/Web/) - 브라우저 동작 원리 및 웹 기술
- [Machine Learning](/notes/Machine_Learning/) - 브라우저에서 실행하는 ML

## 참고

- [WebGPU 무엇인가?](https://jusths.tistory.com/334)
- [WebGL vs WebGPU 상세 차이점 1](https://pnltoen.tistory.com/entry/Web-WebGL-및-WebGPU의-개념)
- [WebGL vs WebGPU 상세 차이점 2](https://developer.chrome.com/blog/from-webgl-to-webgpu?hl=ko)
