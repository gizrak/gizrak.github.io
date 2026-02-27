---
title: Docker
category:
  - Technology
---

> 컨테이너 기반 가상화 플랫폼 → [가상화](/notes/가상화/) 참조

## 자주 쓰는 명령어

- [Dockerfile 자주 쓰이는 명령어](https://www.daleseo.com/dockerfile/)

### exited된 모든 컨테이너 삭제

```bash
docker rm $(docker ps -a -q -f status=exited)
```

## 환경 설정

- [윈도우 WSL에서 Docker 설치](https://www.lainyzine.com/ko/article/how-to-install-docker-on-wsl/)
- [Mac에서 Docker 환경구성 및 기본 사용법](https://bblog.tistory.com/297)
- [Docker Desktop 대탈출, multipass로 갑니다](https://jybaek.tistory.com/934)
- [Mac에서 Docker Desktop 없이 사용하기](https://blog.bsk.im/2021/09/07/macos-docker-without-docker-feat-minikube-ko/)

### Apple Silicon (M1/M2) Mac - Lima 사용

[Lima로 Docker Desktop 대체하기](https://breezymind.com/slicon-m1-mac-lima-docker-desktop-alternative/)

```bash
# 기본 docker 컨테이너 실행
limactl start --name default template://docker
```

메모리 부족 문제 해결 (Airflow 등 대용량 컨테이너용):

```bash
wget https://raw.githubusercontent.com/lima-vm/lima/master/examples/docker.yaml
mv docker.yaml default.yaml
```

`default.yaml` 수정:

```yaml
cpus: 4
memory: "8GiB"
disk: "100GiB"
```

```bash
limactl start default.yaml
```

lima에서 writable 마운트 디렉토리 설정 (`~/.lima/default/lima.yaml`):

```yaml
mounts:
  - location: "~/docker/airflow"
    writable: true
```

## Trouble Shooting

- [exec: "docker-credential-desktop.exe": executable file not found in $PATH](https://stackoverflow.com/a/65896682)

## 관련 노트

- [Kubernetes](/notes/Kubernetes/) - 컨테이너 오케스트레이션
- [가상화](/notes/가상화/) - 가상화 개념 (QEMU/KVM 포함)
- [Airflow](/notes/Airflow/) - Docker Compose 기반 Airflow 설치
- [Kafka](/notes/Kafka/) - Docker Compose 기반 Kafka 구성
