---
title: NLP (Natural Language Processing)
category:
  - Technology
---

> 자연어 처리 - 컴퓨터가 인간의 언어를 이해하고 처리하는 기술

## 단어 표현 방법

### 희소 표현 (Sparse Representation)

- 극히 일부의 인덱스만 특정 값으로 표현, 대부분은 0으로 채움
- 대표: **원-핫 인코딩 (One-Hot Encoding)**
- **BoW (Bag of Words)**: 단어 순서/의미는 무시하고 출현 빈도만 고려

### 밀집 표현 (Dense Representation)

- 텍스트를 실숫값으로 구성하여 사용자가 설정한 차원의 벡터로 표현
- **Word Embedding**: 단어를 밀집벡터(Embedding Vector) 형태로 표현하는 기법

## Word2Vec

> 단어를 컴퓨터가 이해할 수 있도록 수치화된 벡터로 표현하는 기법

- **CBOW**: 주변 단어(Context Word)로 중간 단어를 예측
- **Skip-gram**: 중심 단어를 바탕으로 주변 단어들을 예측
- 테스트 사이트: [Korean Word2Vec](https://word2vec.kr/search/)

## Transformer 모델

> 문장 속 단어와 같은 순차 데이터 내의 관계를 추적해 맥락과 의미를 학습하는 신경망

- Attention 메커니즘 기반
- RNN의 순차 처리 한계를 극복한 병렬 처리 가능
- GPT, BERT 등 현대 LLM의 기반 구조
- [트랜스포머 모델 이해하기](https://blogs.nvidia.co.kr/2022/04/01/what-is-a-transformer-model/)

## Few-shot / Zero-shot / One-shot Learning

- **Zero-shot**: 학습 시 보지 못한 클래스에 대해서도 분류 수행
- **One-shot**: 클래스당 단 1개의 예시로 학습
- **Few-shot**: 클래스당 소수의 예시로 학습

## Self-supervised Learning

- 레이블 없이 데이터 자체의 구조를 활용하여 학습
- Contrastive Learning: 유사한 샘플은 가깝게, 다른 샘플은 멀게

## 수학 기초

- [벡터의 덧셈과 뺄셈](https://jwmath.tistory.com/485)

## 관련 노트

- [신경망 (Neural Network)](/notes/Neural_Network/) - RNN 구조 (NLP에 활용)
- [CLIP](/notes/CLIP/) - 이미지-텍스트 멀티모달 (Contrastive Learning 활용)
- [KILT](/notes/KILT/) - 지식 집약적 언어 작업 벤치마크 (RAG, Attention 포함)
- [Code LLM](/notes/Code_LLM/) - 코드 생성 LLM

## 참고

- [BoW 설명](https://heytech.tistory.com/334)
- [Skip-gram](https://heytech.tistory.com/353)
- [Word2Vec](https://heytech.tistory.com/346)
- [One/Few/Zero-shot Learning](https://velog.io/@nomaday/n-shot-learning)
- [Attention Mechanism](https://ctkim.tistory.com/entry/Attention-Mechanism)
- [Attention Is All You Need](https://20chally.tistory.com/222)
