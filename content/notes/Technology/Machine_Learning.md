---
title: Machine Learning
category:
  - Technology
---

> 학문적 정의와 알고리즘 분류는 [기계학습](/notes/기계학습/) 참조
> 이 노트는 실전 관점의 학습 유형 정리

## 지도학습 (Supervised Learning)

> 정답이 있는 데이터를 활용해 모델을 학습시키는 방법

### 분류 (Classification)

- 주어진 데이터를 정해진 카테고리(라벨)에 따라 분류하는 문제
- 참/거짓의 `이진 분류` 또는 사과/바나나/포도 같은 `다중 분류`
- 대표 모델: CNN, Decision Tree, SVM, Naive Bayes, kNN

### 회귀 (Regression)

- 데이터의 특징(Feature)을 기준으로 연속된 값을 예측하는 문제
- 패턴이나 트렌드, 경향을 예측할 때 사용
- 예시: 아파트 평수/지역 기반 집값 예측
- 대표 모델: Linear Regression, Ridge, Lasso, RNN

## 비지도학습 (Unsupervised Learning)

> 정답 라벨이 없는 데이터를 비슷한 특징끼리 군집화하여 패턴을 찾는 방법

- 클러스터링 (Clustering)
- Dimensionality Reduction, Hidden Markov Model
- **GAN (Generative Adversarial Network)**
  - 생성자(Generator)가 판별자(Discriminator)를 속이도록 훈련되는 방식으로 비지도 학습 수행
  - 제로섬 게임(zero-sum game): 생성자는 목적 함수를 최소화, 판별자는 최대화

## 강화학습 (Reinforcement Learning)

> 행동 심리학에서 나온 이론으로, 자신이 한 행동에 대해 보상(reward)을 받으며 학습하는 방법

- 에이전트 (Agent)
- 환경 (Environment)
- 상태 (State)
- 행동 (Action)
- 보상 (Reward)

## 대표 알고리즘

| 분류         | 종류          | 알고리즘                         |
| ------------ | ------------- | -------------------------------- |
| Supervised   | Classification | kNN, Naive Bayes, SVM, Decision Tree |
|              | Regression    | Linear Regression, Locally Weighted Linear, Ridge, Lasso |
| Unsupervised |               | K-Means, Density Estimation, EM, DBSCAN |
| Reinforcement |              | DQN, A3C                         |

## Feature Engineering

- Feature는 Label, Class, Target, Response, Dependent variable 등으로도 불림
- 딥러닝 이전: Feature Engineer가 직접 Raw 데이터에서 적절한 피처를 추출
- 딥러닝 이후: Raw 데이터를 모델에 입력하면 모델이 자동으로 feature를 학습

## 알파고 (AlphaGo)

- 강화학습 + 딥러닝을 결합한 바둑 AI
- [바둑 모든 경우의 수](https://tromp.github.io/go/legal19.html)

## 관련 노트

- [기계학습](/notes/기계학습/) - 학문적 정의 및 알고리즘 분류
- [신경망 (Neural Network)](/notes/Neural_Network/) - ANN/DNN/CNN/RNN 구조
- [NLP](/notes/NLP/) - 자연어 처리
- [Fine Tuning](/notes/Fine_Tuning/) - 사전학습 모델 파라미터 조정
- [KILT](/notes/KILT/) - 지식 집약적 언어 작업 벤치마크

## 참고

- [딥 러닝과 머신 러닝의 비교](https://www.zendesk.kr/blog/machine-learning-and-deep-learning/)
- [PyTorch로 시작하는 딥 러닝 입문](https://wikidocs.net/book/2788)
- [딥러닝 알고리즘 종류별 이해하기](https://m.blog.naver.com/sundooedu/221211368089)
- [딥러닝 분야별 SOTA 브라우저](https://paperswithcode.com/sota)
