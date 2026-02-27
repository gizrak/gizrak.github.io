---
title: OpenSSL
category:
  - Security
---

> SSL/TLS 인증서 생성 및 관리 도구 → [인증과 전자서명](/notes/인증과_전자서명/) 참조

## Demo CA 설정

```bash
# 1. demoCA 디렉토리 생성
mkdir demoCA
echo "00" > demoCA/serial
touch demoCA/index.txt
```

## CA 인증서 생성

```bash
# CA 개인키 생성
openssl genrsa -des3 -out ca.key 1024

# Self-Signed CA 인증서 생성
openssl req -new -x509 -days 365 -key ca.key -out ca.crt
```

## 서버 인증서 생성

```bash
# 개인키 생성
openssl genrsa -des3 -out server.key 1024

# CSR(인증서 서명 요청) 생성
openssl req -new -days 365 -key server.key -out server.csr

# CA로 서버 인증서 서명
openssl ca -in server.csr -out server.crt -keyfile ca.key -cert ca.crt -outdir .
```

## TLS 상호 인증 (mTLS)

인증에 사용되는 파일 6개:

| type    | private key      | public key  |
| ------- | ---------------- | ----------- |
| 인증기관 | ca_key.pem      | ca.crt      |
| 서버    | server_key.pem   | server.crt  |
| 클라이언트 | client_key.pem | client.crt  |

### CA 인증서 생성

```bash
openssl genrsa -des3 -out ca.key 1024
openssl req -new -key ca.key -out ca.csr
openssl x509 -req -days 1280 -in ca.csr -signkey ca.key -out ca.crt
# 개인키에서 패스워드 제거
openssl rsa -in ca.key -out ca_key.pem
```

### 서버 인증서 생성

```bash
openssl genrsa -des3 -out server.key 1024
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -out server.crt \
    -signkey server.key -CA ca.crt -CAkey ca.key \
    -CAcreateserial -days 365
openssl rsa -in server.key -out server_key.pem
```

### 클라이언트 인증서 생성

```bash
openssl genrsa -des3 -out client.key 1024
openssl req -new -key client.key -out client.csr
openssl x509 -req -in client.csr -out client.crt \
    -signkey client.key -CA server.crt -CAkey server.key \
    -CAcreateserial -days 365
openssl rsa -in client.key -out client_key.pem
```

## 포맷 변환

```bash
# crt → der (바이너리 포맷)
openssl x509 -in ca.crt -out ca.der -outform DER

# pem → der
openssl x509 -in demoCA/cacert.pem -outform DER -out cacert.der

# der → pem
openssl x509 -in cert.cer -inform DER -out cert.pem -outform PEM
```

## 인증서 확인

```bash
# 인증서 내용 보기
openssl x509 -noout -text -in client.crt

# 비밀키 보기
openssl rsa -noout -text -in server.key

# openssl 설치 확인
httpd -t
```

## PFX 변환

```bash
# crt + key → pfx
openssl pkcs12 -export -in client.crt -inkey client.key \
    -certfile ca.crt -out bundle.p12

# pfx에서 키 추출
openssl pkcs12 -in filename.pfx -nocerts -out key.pem

# pfx에서 인증서 추출
openssl pkcs12 -in filename.pfx -clcerts -nokeys -out cert.pem
```

## 관련 노트

- [인증과 전자서명](/notes/인증과_전자서명/) - SSL/TLS 원리, JWT, HMAC
- [알고리즘](/notes/Algorithm/) - RSA, AES 등 암호화 알고리즘
- [Nginx](/notes/Nginx/) - Nginx에 SSL/TLS 적용

## 참고

- [OpenSSL로 ROOT CA 생성 및 SSL 인증서 발급](https://www.lesstif.com/system-admin/openssl-root-ca-ssl-6979614.html)
- [OpenSSL로 인증서 생성 및 변환 간략 정리](http://www.silverwolf.co.kr/websecurity/8688)
- [안전한 패스워드 저장](https://d2.naver.com/helloworld/318732)
