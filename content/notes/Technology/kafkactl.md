---
title: kafkactl
category:
  - Technology
---

> Kafka 관리 CLI 도구 → [Apache Kafka](/notes/Kafka/) 참조

## 설치

### Mac

```bash
brew tap deviceinsight/packages
brew install deviceinsight/packages/kafkactl
brew upgrade deviceinsight/packages/kafkactl
```

### Linux

```bash
wget https://github.com/deviceinsight/kafkactl/releases/download/v3.1.0/kafkactl_3.1.0_linux_amd64.tar.gz
tar xzf kafkactl_3.1.0_linux_amd64.tar.gz
```

## 설정

`~/.config/kafkactl/config.yml`:

```yaml
contexts:
  default:
    brokers:
    - 10.111.111.111:9092
    - 10.112.112.112:9092
  svc-dev:
    brokers:
    - 10.211.211.211:9092
    - 10.212.212.212:9092
    - 10.213.213.213:9092
current-context: svc-dev
```

## 사용법

### Topic replication-factor 온라인 변경

```bash
kafkactl alter topic mytopic --replication-factor 3
```

## 관련 노트

- [Apache Kafka](/notes/Kafka/) - Kafka 설치 및 SASL 설정
