---
title: 알고리즘
category:
  - Computer
---

`Algorithm`

## 알고리즘의 기본 조건

1. **입력**: 0개 이상의 자료 존재
2. **출력**: 최소 1개 이상의 결과
3. **명확성**: 각 단계는 명확하고 애매함 없음
4. **유한성**: 반드시 종료해야 함
5. **효과성**: 충분히 단순하여 실행 가능해야 함

## 정렬 알고리즘

| 종류     | 원리                  | Best      | Worst    | Stable | Memory  |
| -------- | --------------------- | --------- | -------- | ------ | ------- |
| 버블 정렬 | 두 개씩 비교          | O(n)      | O(n²)   | Yes    | O(1)    |
| 선택 정렬 | 순회 시 최솟값 선택   | O(n²)    | O(n²)   | No     | O(1)    |
| 삽입 정렬 | 알맞은 위치에 삽입    | O(n)      | O(n²)   | Yes    | O(1)    |
| 병합 정렬 | 분할 정복 후 병합     | O(n log n) | O(n log n) | Yes | O(n)   |
| 퀵 정렬  | pivot 기준 좌우 배치  | O(n log n) | O(n²)  | No     | O(log n)~O(n) |

> 버블/삽입 정렬: 이미 정렬된 경우 O(n) 가능
> 퀵 정렬: pivot 선택에 따라 성능 차이 큼 (평균 O(n log n))

## 탐색 알고리즘

- **이진 탐색**: 정렬된 배열에서 O(log n) 탐색
- **DFS** (Depth-First Search): 깊이 우선 탐색
- **BFS** (Breadth-First Search): 너비 우선 탐색
- **힙 트리 탐색**: 우선순위 큐 기반 O(log n)
- **다익스트라 알고리즘**: 최단 경로 (음의 가중치 없을 때)

## 암호화 알고리즘

| 분류    | 알고리즘                             | 설명                        |
| ------- | ------------------------------------ | --------------------------- |
| 대칭키  | DES (Data Encryption Standard)       | 초창기 미국 NIST 표준       |
|         | AES (Advanced Encryption Standard)   | DES를 개선한 NIST 표준      |
| 비대칭키 | RSA (Rivest, Shamir, Adleman)        | 공개키 암호화 표준           |

→ [인증과 전자서명](/notes/인증과_전자서명/)에서 대칭키/비대칭키 활용 방법 참조

## 기타 알고리즘 기법

- **백트래킹**: 해를 찾다가 막히면 되돌아가는 방법
- **동적 계획법 (DP)**: 부분 문제의 결과를 저장하여 중복 계산 방지
- **분할 정복법**: 문제를 더 작은 부분으로 나눠 해결
- **그리디 알고리즘**: 현재 상황에서 최선의 선택을 반복

## 유클리드 호제법 (GCD/LCM)

> 두 수의 최대공약수(GCD)와 최소공배수(LCM)를 구하는 알고리즘

```python
def gcd(a, b):
    """최대공약수 (Greatest Common Divisor)"""
    while b > 0:
        a, b = b, a % b
    return a

def lcm(a, b):
    """최소공배수 (Lowest Common Multiple)"""
    return a * b // gcd(a, b)
```

## 관련 노트

- [인증과 전자서명](/notes/인증과_전자서명/) - 암호화 알고리즘 활용 (RSA, AES)
- [AVL Tree](/notes/AVL_Tree/) - 트리 기반 탐색 알고리즘
