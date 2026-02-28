---
date: 2024-02-08 18:41:55
created: 2024-02-08 16:50:00
---

# Machine Learning

![](Files/image%20247.png)<br>

<br>

## 지도학습 (Supervised Learning)

> 정답이 있는 데이터를 활용해 모델을 학습시키는 방법  

<br>

### 분류 (Classification) → CNN

- 주어진 데이터를 정해진 카테고리(라벨)에 따라 분류하는 문제
- 참/거짓을 하는 `이진 분류`  또는 사과/바나나/포도 같은 `다중 분류`  

<br>

### 회귀 (Regression) → RNN

- 데이터의 특징(Feature)을 기준으로 연속된 값을 예측하는 문제
- 패턴이나 트렌드, 경향을 예측할 때 사용
- 예를 들어, 서울에 있는 20평대 아파트 집값 가격, 30평대 아파트 가격, 지방의 20평대 아파트 가격등을 입력데이터로 주고 결과를 주면, 어떤 지역의 30평대 아파트 가격이 어느정도 인지 예측

<br>

## 비지도학습 (Unsupervised Learning)

> 정답 라벨이 없는 데이터를 비슷한 특징끼리 군집화 하여 새로운 데이터에 대한 결과를 예측하는 방법

<br>

- 클러스터링 (Clustering)
- Dimentionality Reduction, Hidden Markov Model, etc...
- GAN (Generative Adversarial Network)
    - 생성자(generator)가 판별자(discriminator)를 속이도록 훈련되는 간접적인 방식으로 비지도 학습을 수행
    - 이 게임은 제로섬 게임(zero-sum game)으로 생성자는 목적 함수를 최소화하고 판별자는 최대화

<br>

## 강화학습 (Reinforcement Learning)

> 행동 심리학에서 나온 이론으로, 자신이 한 행동에 대해 보상(reward)를 받으며 학습하는 방법  

<br>

![](Files/image%20248.png)<br>

<br>

- 에이전트(Agent) 
- 환경(Environment) 
- 상태(State) 
- 행동(Action) 
- 보상(Reward)

<br>

## +대표 알고리즘

|     |     |     |
| --- | --- | --- |
| Supervised | Classification | kNN |
| <br> | <br> | Naive Bayes |
| <br> | <br> | Support Vector |
| <br> | <br> | Machine Decision |
| <br> | Regression | Linear Regression |
| <br> | <br> | Locally Weighted Linear |
| <br> | <br> | Ridge |
| <br> | <br> | Lasso |
| Unsupervised | <br> | Clustering |
| <br> | <br> | K Means |
| <br> | <br> | Density Estimation |
| <br> | <br> | Exception Maximization |
| <br> | <br> | Pazen Window |
| <br> | <br> | DBSCAN |
| Reinforcement | <br> | DQN |
| <br> | <br> | A3C |

<br>

## +Feature Engineering

- Feature는 Label, Class, Target, Response, Dependent variable 등으로 불려짐 
- 딥러닝 이전의 머신러닝에서는 Raw데이터를 피처 엔지니어가 직접 적절한 피처를 만들고, 머신러닝 모델의 결과로 아웃풋을 냈었는데, 
- 딥러닝 이후로 Raw데이터를 딥러닝 모델에 넣어주면 모델이 알아서 feature를 알아내고 아웃풋을 내는 형식으로 발전

<br>

![](Files/image%20249.png)<br>

<br>

## +알파고

- [바둑 모든 경우의 수](https://tromp.github.io/go/legal19.html)

<br>

<br>