---
title: Kafka SASL 컨슈머 설정
category:
  - 프로그래밍
---

## Kafka 설치

Mac 기준으로 `brew`를 이용하여 설치 후 서비스로 구동

```shell
$ brew install kafka
$ brew services start kafka
```

## SASL 컨슈머 설정

`SASL_PLAINTEXT`는 간단하게 username, password 기반으로 인증을 수행하는 방식이다. 컨슈머에서의 설정은 `consumer.properties` 파일이다. `brew`로 설치된 기준이며, 경로는 환경에 따라 다를 수 있다.

```properties
group.id=ted-consumer-group
security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required \
             username="ted" \
             password="hwang";
```

## 컨슈머 실행

위 설정한 `consumer.properties` 이용하여 읽고자 하는 토픽을 컨슈밍 시작한다.

```shell
$ /usr/local/opt/kafka/bin/kafka-console-consumer \
    --bootstrap-server kafka.ted-site.me:9092 \
    --consumer.config /usr/local/etc/kafka/consumer.properties \
    --topic TEST_TOPIC \
    --from-beginning
```
