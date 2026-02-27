---
title: Reasoning vs Inference
category:
  - Technology
---

> AI/LLM 맥락에서 자주 혼용되는 두 개념의 차이

## 개념 구분

| 개념        | 정의                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| **Reasoning (추론 과정)** | 논리적 사고 과정을 통해 결론을 도출하는 방법 |
| **Inference (추론 결과)** | reasoning 과정을 통해 도출된 결론 |

## Reasoning의 유형

### Deductive Reasoning (연역적 추론)
- 일반적인 원칙에서 특정 결론을 도출
- 예: "모든 사람은 죽는다" + "소크라테스는 사람이다" → "소크라테스는 죽는다"

### Inductive Reasoning (귀납적 추론)
- 여러 개별 사례를 바탕으로 일반적인 원칙을 도출
- 경험을 통해 일반적인 패턴 발견 (정확한 결론 보장 불가)

### Abductive Reasoning (가설적 추론)
- 가장 좋은 설명을 찾기 위해 가설을 세우고 테스트
- 가장 가능성 있는 설명을 찾는 과정 (정확한 결론 보장 불가)

## Inference

- reasoning 과정의 결과물
- 주어진 사실/가정에서 이끌어낸 결론
- 예: "A > B이고 B > C이다" → "A > C" (inference)
- 논리적일 수도, 비논리적일 수도 있음

## 요약

> **Reasoning**은 추론하는 과정 자체, **Inference**는 그 과정의 결과물
> Reasoning은 목표를 달성하기 위한 사고 과정, Inference는 그 결과물

## 관련 노트

- [KILT](/notes/KILT/) - LLM의 지식 집약적 추론
- [NLP](/notes/NLP/) - 자연어 기반 추론
