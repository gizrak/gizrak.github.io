---
date: 2025-02-24 14:51:24
created: 2024-02-08 16:29:07
---

# Neural Network

## Get Started

- 인공지능(Artificial Intelligence): 인간의 지능이 갖고 있는 기능을 갖춘 컴퓨터 시스템을 뜻하며, 인간의 지능을 기계 등에 인공적으로 구현한 것
- 머신러닝(Machine Learning): 인공지능의 한 분야로, 컴퓨터가 학습할 수 있도록 하는 알고리즘과 기술을 개발하는 분야
- 딥러닝(Deep Learning): 여러 비선형 변환기법의 조합을 통해 높은 수준의 추상화를 시도하는 기계학습 알고리즘의 집합

<br>

![](Files/image%20235.png)<br>

<br>

## ANN (Artificial Neural Network)

> 사람의 신경망 원리와 구조를 모방하여 만든 기계학습 알고리즘  

<br>

![](Files/image%20236.png)<br>

### 문제점

1. 학습과정에서 파라미터의 최적값을 찾기 어렵다
2. Overfitting 따른 문제 -> 사전훈련으로 해결
3. 학습시간이 너무 느리다 -> GPU 발전으로 해결

<br>

## DNN (Deep Neural Network)

> ANN 문제를 해결하기 위해 은닉층을 2개 이상 구성하여 학습의 결과를 향상한 알고리즘

<br>

![](Files/image%20237.png)<br>

<br>

## CNN (Convolution Neural Network)

> 데이터에서 지식을 추출하는 기존 방식과 다르게, 특징을 추출하여 패턴을 파악하는 알고리즘

<br>

![](Files/image%20238.png)<br>

![](Files/image%20239.png)<br>

<br>

### Convolution

- 데이터 특징을 추출하는 과정
- 각 성분의 인접 성분들을 조사해 특징을 파악하고, 파악한 특징을 한장으로 도출
- 도출된 장을 Convolution Layer 라고 부름

### Pooling

- Convolution 과정을 거친 레이어의 사이즈를 줄여주는 과정
- 데이터 사이즈를 줄이고, 노이즈를 상쇄하고, 미세한 부분에서 일관적인 특징을 제공

<br>

## RNN (Recurrent Neural Network)

> 반복적이고 순차적인 데이터 학습에 특화된 인공신경망 알고리즘

<br>

![](Files/image%20240.png)<br>

<br>

## 참고

- [\[인공지능\] ANN, DNN, CNN, RNN 개념과 차이 :: 삶은 확률의 구름 (tistory.com)](https://ebbnflow.tistory.com/119)
- [문자열 데이터 CNN vs RNN 어떤 모델이 더 좋을까? (tistory.com)](https://cholol.tistory.com/465)

<br>

<br>

<br>

<br>