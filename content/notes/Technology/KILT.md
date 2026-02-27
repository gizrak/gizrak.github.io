---
title: KILT (Knowledge Intensive Language Tasks)
category:
  - Technology
---

> Facebook AI Research에서 제안한 지식 집약적 자연어 처리 벤치마크 프레임워크

## KILT 벤치마크

- 다양한 지식 집약적 NLP 작업을 위한 공통 인터페이스 제공
- 단일 지식 원천: Wikipedia 스냅샷 (5.9백만 페이지, 2019/08/01)
- 5개의 작업 유형, 11개의 데이터셋
  - 팩트 체킹 (FEVER)
  - 엔티티 링킹 (WNED, AIDA CoNLL-YAGO)
  - 슬롯 채우기 (T-REx, Zero-Shot Relation Extraction)
  - 오픈 도메인 질문 응답 (TriviaQA, Natural Questions, HotpotQA)
  - 대화 (ELI5, Wizard of Wikipedia)

### 결과

- seq2seq 모델 + 밀집 벡터 인덱스 조합이 강력한 기준선 제공
- 오픈 도메인 QA 및 대화에서 맞춤형 접근 방식 능가
- 엔티티 링킹 및 슬롯 채우기에서 경쟁력 있는 결과

## RAG (Retrieval-Augmented Generation)

> 검색(Retrieval) + 생성(Generation)을 결합한 LLM 강화 기법

### 구조

- **검색 모듈**: 사전 학습된 신경 검색기 + Wikipedia 밀집 벡터 인덱스
- **생성 모듈**: 사전 학습된 seq2seq Transformer (예: BART)
- 두 모듈을 확률적 모델로 결합하여 end-to-end 파인튜닝

### 동작 원리

1. 입력 쿼리(x)를 기반으로 관련 문서(z)를 검색
2. 검색된 문서를 추가 컨텍스트로 활용하여 답변(y) 생성
3. 비매개변수화 메모리(문서 인덱스) 교체로 지식 업데이트 가능

### RAG vs Fine Tuning

| 기준        | RAG                              | Fine Tuning                        |
| ----------- | -------------------------------- | ---------------------------------- |
| 지식 업데이트 | 문서 인덱스만 교체               | 모델 재학습 필요                   |
| 추론 속도   | 검색 오버헤드 발생               | 빠름                               |
| 적합한 경우 | 최신 정보, 지식 집약적 작업      | 특정 도메인 스타일/형식 학습       |

## Attention 메커니즘

> Transformer의 핵심: 입력 시퀀스 내 모든 위치 간의 관계를 직접 모델링

- [Transformer 기반 LLM 설명](https://yona.naverlabs.com/PlatformEngineering/mlops-study/post/30)
- [어텐션 메커니즘이란?](https://ctkim.tistory.com/entry/Attention-Mechanism)
- [Attention Is All You Need](https://20chally.tistory.com/222)

## 관련 노트

- [NLP](/notes/NLP/) - 자연어 처리 기법 (Word2Vec, Transformer)
- [Machine Learning](/notes/Machine_Learning/) - 지도/비지도/강화 학습
- [Fine Tuning](/notes/Fine_Tuning/) - RAG vs Fine Tuning 비교
- [Code LLM](/notes/Code_LLM/) - 코드 생성 LLM (Knowledge-intensive Tasks)

## 참고

- [KILT Benchmarking (Meta AI)](https://ai.meta.com/tools/kilt/)
- [KILT GitHub](https://github.com/facebookresearch/KILT)
- [KILT 논문 (NAACL 2021)](https://aclanthology.org/2021.naacl-main.200.pdf)
- [RAG 논문 (NeurIPS 2020)](https://proceedings.neurips.cc/paper/2020/file/6b493230205f780e1bc26945df7481e5-Paper.pdf)
- [RAG 초보자 가이드](https://couplewith.tistory.com/543)
- [캐글에서 살펴본 RAG 트렌드 (1)](https://brunch.co.kr/@hotorch/20)
- [캐글에서 살펴본 RAG 트렌드 (2)](https://brunch.co.kr/@hotorch/21)
