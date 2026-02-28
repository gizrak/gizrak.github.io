---
date: 2024-02-07 15:46:11
created: 2023-06-13 20:30:06
---

# WebGPU

> 택민님과 함께 정리 필요  

<br>

## 개요

### 정의

- [WebGPU 무엇인가?](https://jusths.tistory.com/334)
- 웹 어플리케이션에서 로컬 디바이스의 GPU를 직접 접근하고 활용할 수 있게 해주는 도구
    - [차세대 그래픽 API는 WebGL의 단점을 해결하는 것을 목표로 합니다](https://velog.io/@sehyunny/chrome-will-support-web-gpu-api-by-default)
    - 2017년부터 시작, 낮은 오버헤드 API 이점을 웹 브라우저 환경에 제공하는 것으로 목표
    - WebGPU는 이름에 "web"이 들어가 있지만 브라우저에 국한되지 않음
        - [wgpu 프로젝트](https://github.com/gfx-rs/wgpu)는 웹 브라우저 외부에 WebGPU앱을 작성하고 실행할 수 있는 Rust용 WebGPU 버전

- 참고) WebGL
    - [https://roseline.oopy.io/dev/webgl](https://roseline.oopy.io/dev/webgl)  
    - 2009년 출시, WebGL API는 OpenGL ES 2.0을 기반 ![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8oqZatKsDEc4X9fiU_1OwA.png)

<br>

### 범위와 역할

1. [OpenGL의 한계](https://blog.naver.com/dmatrix/221808847792)
2. 벤더별
    - 마이크로소프트 DirectX
    - 애플 Metal
3. 오픈소스
    - Vulkan 등장, 저수준, 낮은 오버헤드 API
    - [Vulkan vs OpenGL](https://yhc509.tistory.com/97)
4. 웹 환경
    - WebGL → WebGPU

<br>

## WebGL vs WebGPU

### 개선점

- 모던 그래픽 카드를 활용하여 그래픽, 컴퓨팅에 최적화되어 있음
- 멀티스레딩 지원으로 고성능
- 저수준 API로 그래픽카드를 좀더 세부 제어 가능하다.
- 최신의 보안 표준과 관행
- 지원하지 않는 웹브라우저가 있을 수 있음.

<br>

### 항목별 비교

[상세한 차이점1](https://https//pnltoen.tistory.com/entry/Web-WebGL-%EB%B0%8F-WebGPU%EC%9D%98-%EA%B0%9C%EB%85%90), [상세한 차이점2](https://developer.chrome.com/blog/from-webgl-to-webgpu?hl=ko)

|     |     |     |     |
| --- | --- | --- | --- |
| <br> | WebGL | WebGPU | 비고  |
| 전역 상태 | Global State | Stateless API | 전역 상태 대신 [파이프라인](https://gpuweb.github.io/gpuweb/#pipelines) 개념으로 렌더링 상태를 캡슐화 |
| 동기화 | Sync API | Async API | 프로세스 간 통신을 버블 없이 유지<br>비동기 콜백으로 오류를 확인 |
| 컴퓨팅 쉐이더 | vertex<br>fragment shader | vertex<br>fragment shader<br>compute shader | 컴퓨팅 셰이더는 GPU에서 실행되어 범용 계산을 수행하는 프로그램<br>이 차이점 때문에 그래픽 처리에 제한되지 않을 수 있음<br>머신러닝, 물리 시뮬레이션, 과학 컴퓨팅 등 다양한 작업에 사용 가능 |
| 동영상 프레임 처리 | 제한된 병렬 처리 | 제한 없음 | <br> |
| 캔버스 처리 | 16 canvas (Chrome)<br>200 canvas (Firefox) | No Limit | <br> |
| <br> | <br> | <br> | <br> |

<br>

### 성능 비교

![](Files/image%20250.png)<br>

[https://www.youtube.com/watch?v=20p7GR-nTeM](https://www.youtube.com/watch?v=20p7GR-nTeM)  

<br>

## 실습

### 모델 관련

- LLM: [https://webllm.mlc.ai/](https://webllm.mlc.ai/)
- Stable Diffusion: [https://websd.mlc.ai/](https://websd.mlc.ai/)

### 드로잉 관련

- [https://codelabs.developers.google.com/your-first-webgpu-app?hl=ko#0](https://codelabs.developers.google.com/your-first-webgpu-app?hl=ko#0)
- [https://webgpu.github.io/webgpu-samples/samples/helloTriangle](https://webgpu.github.io/webgpu-samples/samples/helloTriangle)
- [https://webgpu.github.io/webgpu-samples/workload-simulator.html?animate&canvasOptions](https://webgpu.github.io/webgpu-samples/workload-simulator.html?animate&canvasOptions)

<br>

## 저장소

- [https://es.naverlabs.com/tm-kwon/webgpu-study](https://es.naverlabs.com/tm-kwon/webgpu-study)

<br>

## 참고 자료

- [https://codelabs.developers.google.com/your-first-webgpu-app?hl=ko#0](https://codelabs.developers.google.com/your-first-webgpu-app?hl=ko#0)
- [https://developer.mozilla.org/en-US/docs/Web/API/WebGPU\_API#examples](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#examples)
- [https://webgpu.github.io/webgpu-samples/samples/particles](https://webgpu.github.io/webgpu-samples/samples/particles)
- [https://github.com/tqchen/tvm-webgpu-example](https://github.com/tqchen/tvm-webgpu-example)

<br>