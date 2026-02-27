---
title: Nginx
category:
  - Web
---

> 고성능 웹 서버 및 리버스 프록시 서버

## Tips

- [Nginx location 우선순위](https://stackoverflow.com/questions/5238377/nginx-location-priority)
- [Prometheus를 통한 Nginx 모니터링](https://sarc.io/index.php/cloud/1787-prometheus-nginx-monitoring)
- [Nginx에 HTTPS/SSL 적용하기](https://velog.io/@kimmjieun/nginx에-SSLHTTPS-적용하기)

## Location 우선순위

```nginx
location = /exact { }    # 1순위: 정확히 일치
location ^~ /prefix { }  # 2순위: 접두사 일치 (정규식 검색 중단)
location ~ /regex { }    # 3순위: 대소문자 구분 정규식
location ~* /regex { }   # 3순위: 대소문자 무시 정규식
location /prefix { }     # 4순위: 접두사 일치 (가장 긴 것 선택)
```

## 관련 노트

- [OpenSSL](/notes/OpenSSL/) - SSL 인증서 생성 (Nginx HTTPS 설정에 활용)
- [Linux](/notes/Linux/) - Nginx 로그 파싱
- [Kubernetes](/notes/Kubernetes/) - K8s Ingress에서 Nginx 활용
- [DevOps](/notes/DevOps/) - 배포 전략 (Nginx 로드밸런서)
