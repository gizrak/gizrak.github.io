---
title: Apache Kafka
category:
  - Technology
---

> 분산 이벤트 스트리밍 플랫폼 → [메시지 브로커](/notes/Message_Broker/) 참조

## 기본 개념

- [Apache Kafka 기본 개념](https://jyeonth.tistory.com/30)
- [ISR: In Sync Replica](https://log-laboratory.tistory.com/234)

## 설치

### Mac (Homebrew)

```bash
brew install kafka
brew services start kafka
```

## SASL 컨슈머 설정

SASL_PLAINTEXT: username/password 기반 인증 방식

`/usr/local/etc/kafka/consumer.properties` (brew 설치 기준):

```properties
group.id=ted-consumer-group
security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required \
             username="ted" \
             password="hwang";
```

컨슈밍 시작:

```bash
/usr/local/bin/kafka-console-consumer \
    --bootstrap-server kafka.ted-site.me:9092 \
    --consumer.config /usr/local/etc/kafka/consumer.properties \
    --topic TEST_TOPIC \
    --from-beginning
```

## Docker Compose 구성

```yaml
# docker-compose.yaml 예시 (Kafka + Zookeeper)
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
```

## 관련 노트

- [kafkactl](/notes/kafkactl/) - Kafka CLI 관리 도구
- [메시지 브로커](/notes/Message_Broker/) - 메시지 브로커 개요 및 비교
- [Docker](/notes/Docker/) - Docker Compose 기반 Kafka 구성
- [분산 환경과 서비스](/notes/분산_환경과_서비스/) - 분산 시스템 아키텍처

## 참고

- [Logstash, Kafka를 대신할 수 있을까?](https://bae200ok.medium.com/logstash-kafka를-대신할-수-있을까-82efe97e13d9)
