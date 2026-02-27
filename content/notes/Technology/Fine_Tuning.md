---
title: Fine Tuning
category:
  - Technology
---

> 기존에 학습된 모델을 새로운 목적에 맞게 재학습하는 기법

## 정의

- 기존에 학습된 모델을 기반으로 아키텍처를 새로운 목적에 맞게 변형하고, 이미 학습된 모델 Weights로부터 학습을 업데이트하는 방법
- 모델의 파라미터를 미세하게 조정하는 행위
- 특히 딥러닝에서는 이미 존재하는 모델에 추가 데이터를 투입하여 파라미터를 업데이트하는 것

## 핵심 개념

- **정교한 (Fine)**: 기존 학습을 바탕으로 섬세하게 조정
- **파라미터 (Parameter)**: 모델이 학습을 통해 조정하는 가중치 값

## Bottleneck Feature vs Fine Tuning

- **Bottleneck Feature**: 사전 학습된 모델의 마지막 출력층 직전 레이어 특성값을 추출하여 분류기로 학습
- **Fine Tuning**: 사전 학습된 모델 전체(또는 일부)를 새 데이터로 재학습

## RAG vs Fine Tuning

| 방법       | 특징                               | 적합한 경우                          |
| ---------- | ---------------------------------- | ------------------------------------ |
| Fine Tuning | 모델 파라미터 자체를 업데이트     | 특정 도메인 스타일/형식 학습         |
| RAG         | 외부 지식을 검색해 모델에 주입    | 최신 정보 반영, 지식 업데이트 필요   |

## 관련 노트

- [신경망 (Neural Network)](/notes/Neural_Network/) - 신경망 기본 구조
- [Machine Learning](/notes/Machine_Learning/) - 머신러닝 학습 유형
- [KILT](/notes/KILT/) - RAG vs Fine Tuning 비교 및 지식 집약적 작업
- [CLIP](/notes/CLIP/) - Zero-shot 학습 (Fine Tuning 없이 일반화)

## 참고

- [보틀넥 피처, 파인 튜닝](https://haandol.github.io/2016/12/25/define-bottleneck-feature-and-fine-tuning.html)
- [파라미터(Parameter)와 하이퍼파라미터(Hyperparameter)](https://leeezxxswd.tistory.com/27)
- [RAG or 파인튜닝? 선택 전 던져야 할 몇 가지 질문들](https://brunch.co.kr/@delight412/620)
- [딥러닝의 Quantization (양자화)와 Quantization Aware Training](https://gaussian37.github.io/dl-concept-quantization/)
