---
title: Kubernetes
category:
  - Technology
---

`K8s`

> 컨테이너 오케스트레이션 플랫폼 → [가상화](/notes/가상화/) 참조

## 참고 자료

- [WSL2에서 minikube로 K8s 사용](https://mini.jellypo.pe.kr/wp/?p=11205)
- [Istio는 무엇이고 왜 중요할까?](https://www.linkedin.com/pulse/istio는-무엇이고-왜-중요할까-sean-lee/)
- [Istio & Envoy 파헤치기](https://phantasmicmeans.tistory.com/entry/Istio-파헤치기)
- [K8S Volume - PV/PVC](https://kimjingo.tistory.com/153)
- [k3s 설치하기](https://velog.io/@lijahong/0부터-시작하는-Kubernetes-공부-K3S-설치하기)
- [Silicon M1 Mac에서 쿠버네티스 환경 구축 (lima + minikube)](https://breezymind.com/slicon-m1-mac-kubernetes-env-with-lima-minikube/)

## 매니페스트 예시

### nginx.yaml (Deployment + Service)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.17.5
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
  namespace: default
  labels:
    app: nginx
spec:
  ports:
  - port: 80
    protocol: TCP
  selector:
    app: nginx
  type: LoadBalancer
```

### pv-hostpath.yaml (PersistentVolume + PVC)

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-hostpath
spec:
  capacity:
    storage: 2Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  storageClassName: manual
  persistentVolumeReclaimPolicy: Delete
  hostPath:
    path: /tmp/k8s-pv
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-hostpath
spec:
  accessModes:
  - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 1Gi
  storageClassName: manual
```

## 유용한 명령어

```bash
# 현재 context 확인
kubectl config current-context

# context 목록 확인
kubectl config get-contexts

# context 선택
kubectl config use-context <context_name>

# 설정 제거
kubectl config unset users.kubernetes-admin
kubectl config unset contexts.kubernetes-admin@kubernetes
kubectl config unset clusters.kubernetes
```

## 관련 노트

- [Docker](/notes/Docker/) - 컨테이너 기반 기술
- [가상화](/notes/가상화/) - 가상화 개념 (Docker, K8s, QEMU/KVM)
- [스토리지](/notes/스토리지/) - K8s PV/PVC와 연관된 스토리지 유형
