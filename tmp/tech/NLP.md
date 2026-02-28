---
date: 2024-07-13 22:38:44
created: 2024-02-07 15:42:27
---

# NLP

<br>

- [BoW](https://heytech.tistory.com/334?category=453616): 문서 내 단어의 순서와 의미는 고려하지 않고 오직 출현 빈도(frequency)만 고려하여 단어를 표현  
![](https://blog.kakaocdn.net/dn/bKpvVK/btrwIq8su7Y/6tkgKyTjjaovbqwbtAEhI0/img.png)<br>
- CBOW: 주변 단어(Context Word)로 중간에 있는 단어를 예측하는 방법
- [Skip-gram](https://heytech.tistory.com/353): 중심 단어를 바탕으로 주변 단어들을 예측하는 방법
- [Word2Vec](https://heytech.tistory.com/346): 단어(Word)를 컴퓨터가 이해할 수 있도록 수치화된 벡터(Vector)로 표현하는 기법 중 하나
    - 테스트 사이트: [Korean Word2Vec](https://word2vec.kr/search/?query=%ED%95%9C%EA%B5%AD-%EC%84%9C%EC%9A%B8%2B%EB%89%B4%EC%9A%95)
- 희소 표현 (Sparse Representation)
    - 극히 일부의 인덱스만 특정 값으로 표현하고, 대부분의 나머지 인덱스는 의미 없는 값으로 표현
    - 대표적으로 `원-핫 인코딩(One-Hot Encoding)` 
- 밀집표현(Dense Representation)
    - 텍스트를 실숫값으로 구성하여 사용자가 설정한 차원의 벡터로 표현
- Word Embedding
    - 단어를 밀집벡터 형태로 표현하는 기법
    - 임베딩을 통해 얻은 결과인 밀집벡터 → `Embedding Vector` 
- [트랜스포머 모델](https://blogs.nvidia.co.kr/2022/04/01/what-is-a-transformer-model/): 트랜스포머 모델은 문장 속 단어와 같은 순차 데이터 내의 관계를 추적해 맥락과 의미를 학습하는 신경망

<br>

## Math

- [벡터의 덧셈과 뺄셈](https://jwmath.tistory.com/485)

<br>

## Terms

- [One-shot / Few-shot / Zero-shot Learning (velog.io)](https://velog.io/@nomaday/n-shot-learning#:~:text=Zero-shot%20learning%20%28ZSL%29%20%EC%9E%90%EC%97%B0%EC%96%B4%20%EC%B2%98%EB%A6%AC%EC%97%90%EC%84%9C%20%EC%A0%9C%EB%A1%9C%EC%83%B7%20%ED%95%99%EC%8A%B5%20%28Zero-shot,%ED%8F%AC%ED%95%A8%EB%90%9C%20%ED%81%B4%EB%9E%98%EC%8A%A4%EC%97%90%20%EB%8C%80%ED%95%B4%EC%84%9C%EB%A7%8C%20%EB%B6%84%EB%A5%98%20%EC%9E%91%EC%97%85%EC%9D%84%20%EC%88%98%ED%96%89%ED%95%A0%20%EC%88%98%20%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4.)
- [Self supervised Learning](https://sanghyu.tistory.com/184)
- contrastive learning

<br>

<br>

<br>