---
title: 코인 자동매매 랠리
---

> CoDriver - Pacenote - RallyCar

## CoDriver

- 1분 주기
- 코인별로 redis 저장 (모니터)
- 10분 전 대비 등락률 % 계산 into Redis
- 5% 이상이면 시장가 매수 into Mongo (Noti)
  - 매수 unlock 코인 대상
  - 단 최소금액 이상 잔고가 있을 경우
  - 최대 금액 이하로 매수 처리
  - 코인 lock
- 10% 이상이면 해당 코인 매수 unlock (Noti)

## Pacenote

- Redis 저장소 기반
- pace 수식률 10분전(가변)
- route 지난 tick 10분간(가변)
- 그 외 추가

## RallyCar

- 클래스이고 여러 인스턴스로 동작

### Danta Rally

- 10분 주기
- 가지고 있는 코인 대상
- 수익률 5% 바로 시장가 매도 (Noti)
  - 중요한건 수수료 제외하고 남는 돈이 있어야 함
- 수익률 -5% 바로 시장가 매도 (Noti)
- 수익률 -10% 해당 코인 매수 lock (Noti)

## Redis

- pacenote
  - pace: 103.5842
  - courses[]
    - currency
    - first
    - last
    - high
    - low

- rallycar
  - date: 2020-08-16
  - cars[]
    - name: DT048K
    - start: epoch
    - param: period=10m

## DB

- 몽고나 마이시퀄 미정
- rally_history
  - id
  - rally_car
    - name: DT048K
    - param: period=10m
  - bid
    - time: utc
    - price:
    - quantity:
  - adk[]
    - time: utc
    - price:
    - quantity:
  - result
    - course: btc, eth
    - prize: gold, silver, none
    - reward
      - currency: usd
      - amount: 13.65

## CarName

- 두자리 아이덴티티: DT 단타
- 세자리 날짜: 048 일년중 48일
- 한자리 시퀀스: 알파벳
