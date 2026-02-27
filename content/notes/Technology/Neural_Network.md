---
title: 신경망 (Neural Network)
category:
  - Technology
---

## 개요

- 인공지능(Artificial Intelligence): 인간의 지능이 갖고 있는 기능을 갖춘 컴퓨터 시스템
- 머신러닝(Machine Learning): 인공지능의 한 분야로, 컴퓨터가 학습할 수 있도록 하는 알고리즘과 기술을 개발하는 분야 → [기계학습](/notes/기계학습/)
- 딥러닝(Deep Learning): 여러 비선형 변환기법의 조합을 통해 높은 수준의 추상화를 시도하는 기계학습 알고리즘의 집합

## ANN (Artificial Neural Network)

> 사람의 신경망 원리와 구조를 모방하여 만든 기계학습 알고리즘

### 문제점

1. 학습과정에서 파라미터의 최적값을 찾기 어렵다
2. Overfitting 따른 문제 → 사전훈련으로 해결
3. 학습시간이 너무 느리다 → GPU 발전으로 해결

## DNN (Deep Neural Network)

> ANN 문제를 해결하기 위해 은닉층을 2개 이상 구성하여 학습의 결과를 향상한 알고리즘

## CNN (Convolutional Neural Network)

> 데이터에서 지식을 추출하는 기존 방식과 다르게, 특징을 추출하여 패턴을 파악하는 알고리즘
> 이미지 분류, 객체 탐지 등 컴퓨터 비전에 특화

### Convolution

- 데이터 특징을 추출하는 과정
- 각 성분의 인접 성분들을 조사해 특징을 파악하고, 파악한 특징을 한 장으로 도출 (Convolution Layer)

### Pooling

- Convolution 과정을 거친 레이어의 사이즈를 줄여주는 과정
- 데이터 사이즈를 줄이고, 노이즈를 상쇄하고, 미세한 부분에서 일관적인 특징을 제공

## RNN (Recurrent Neural Network)

> 반복적이고 순차적인 데이터 학습에 특화된 인공신경망 알고리즘
> 자연어 처리, 음성 인식, 시계열 데이터에 적합

## 기타 신경망 종류

- 제한 볼츠만 머신 (RBM, Restricted Boltzmann Machine)
- 심층 신뢰 신경망 (DBN, Deep Belief Network)

## CNN vs RNN 비교

|          | CNN                               | RNN                                           |
| -------- | --------------------------------- | --------------------------------------------- |
| 주요 특징 | 이미지 데이터에 특화된 패턴 인식   | 순차적인 데이터에서 시간적 의존성 모델링        |
| 주요 용도 | 이미지 처리                        | 시계열 데이터 및 자연어 처리                   |
| 처리 방식 | 합성곱과 풀링 연산                 | 과거 정보를 현재 상태에 반영 (반복적인 hidden state) |
| 적용 분야 | 컴퓨터 비전, 이미지 분류, 객체 탐지 | 자연어 처리, 음성 인식                         |

## 관련 노트

- [기계학습](/notes/기계학습/) - 머신러닝 알고리즘 유형 및 응용
- [Machine Learning](/notes/Machine_Learning/) - 지도학습/비지도학습/강화학습 실전 가이드
- [NLP](/notes/NLP/) - 자연어 처리 (RNN 기반)
- [CLIP](/notes/CLIP/) - 이미지-텍스트 멀티모달 모델
- [Fine Tuning](/notes/Fine_Tuning/) - 학습된 모델 파라미터 조정

## 참고

- [[인공지능] ANN, DNN, CNN, RNN 개념과 차이](https://ebbnflow.tistory.com/119)
- [문자열 데이터 CNN vs RNN 어떤 모델이 더 좋을까?](https://cholol.tistory.com/465)
