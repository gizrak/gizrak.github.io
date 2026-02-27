---
title: Apache Airflow
category:
  - Technology
---

> 워크플로우 오케스트레이션 플랫폼 → [Docker](/notes/Docker/) 참조

## Docker Compose로 설치 (Apple Silicon M1/M2)

### 사전 조건

1. [Lima 설치 (M1 Mac용 Docker Desktop 대체)](https://breezymind.com/slicon-m1-mac-lima-docker-desktop-alternative/)
2. [Airflow 공식 Docker Compose 가이드](https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html)

### Lima 마운트 설정 (read-only 문제 해결)

Lima는 기본 read-only 정책이라 dags 디렉토리 마운트 시 별도 설정 필요

`~/.lima/default/lima.yaml`:

```yaml
mounts:
  - location: "~/docker/airflow"
    writable: true
```

### docker-compose.yaml 주요 설정

```yaml
version: '3'
x-airflow-common:
  &airflow-common
  image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.4.3}
  environment:
    &airflow-common-env
    AIRFLOW_HOME: /home/airflow
    AIRFLOW_UID: 50000
    AIRFLOW__CORE__LOAD_EXAMPLES: 'false'
  volumes:
   - ./dags:/home/airflow/dags
   - ./logs:/home/airflow/logs
   - ./plugins:/home/airflow/plugins
```

### .env 설정

```bash
# ~/docker/airflow/.env
AIRFLOW_UID=50000
```

> `airflow` 계정의 기본 UID가 `50000`이므로 일치시켜야 함

## Executor 종류

| Executor          | 특징                                    |
| ----------------- | --------------------------------------- |
| Local Executor    | 단일 머신, 병렬 실행 지원               |
| Celery Executor   | 분산 처리, 워커 노드 여러 개 운영 가능  |

## 관련 노트

- [Docker](/notes/Docker/) - Lima 기반 Docker 환경 설정
- [Data Engineering](/notes/Data_Engineering/) - 데이터 파이프라인 관리

## 참고

- [Airflow Local Executor와 Celery Executor](https://dydwnsekd.tistory.com/98)
