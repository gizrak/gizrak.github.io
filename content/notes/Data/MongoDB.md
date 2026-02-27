---
title: MongoDB
category:
  - Data
---

> 문서(Document) 기반 NoSQL 데이터베이스 → [NoSQL](/notes/NoSQL/) 참조

## Read Concern

> 복제 셋(Replica Set)에서 데이터를 읽을 때 일관성 수준 설정

- [Read Concern 상세 설명](https://dlaudtjr03.tistory.com/17)

| Level   | 설명                                              |
| ------- | ------------------------------------------------- |
| local   | 기본값. 복제 확인 없이 즉시 읽기                  |
| majority | 과반수 노드에 복제된 데이터만 반환               |
| linearizable | 최신 데이터 보장, 가장 강한 일관성 (성능 저하) |

## Write Concern

> 쓰기 작업의 승인 수준 설정

- [Write Concern 상세 설명](https://dlaudtjr03.tistory.com/18)

| 설정        | 설명                                         |
| ----------- | -------------------------------------------- |
| w: 1        | Primary만 확인 (기본값)                      |
| w: majority | 과반수 노드 확인 후 응답                     |
| j: true     | 저널(journal) 기록 후 응답                   |

## ObjectId

> MongoDB 문서의 기본 식별자 (_id 필드)

- [ObjectId에 대해서](https://blog.seulgi.kim/2014/09/mongodb-objectid.html)
- [ObjectId와 REST API 설계](https://stackoverflow.com/a/19031308)

12바이트 구조:
- 4바이트: Unix 타임스탬프
- 5바이트: 랜덤값 (머신 ID + 프로세스 ID)
- 3바이트: 순차 카운터

## 관련 노트

- [NoSQL](/notes/NoSQL/) - NoSQL 데이터베이스 개요
- [분산 환경과 서비스](/notes/분산_환경과_서비스/) - 분산 데이터베이스 설계
