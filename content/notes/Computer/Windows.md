---
title: Windows
category:
  - Computer
---

## 패키지 관리자

- [Chocolatey (choco) 설치 및 이용하기](https://evandde.github.io/chocolatey/)
  - Windows용 패키지 관리자 (apt, brew와 유사)

## 파일 관련

- [아이클라우드 한글 파일 자소 분리 자동 변경 프로그램](https://pcwindows.tistory.com/414)
  - macOS와 Windows 간 iCloud 동기화 시 한글 파일명 자소 분리 문제 해결

## SSH

`ssh-copy-id` 대신 사용 가능한 방법:

```bash
cat ~/.ssh/id_rsa.pub | ssh user@123.45.67.89 "cat >> ~/.ssh/authorized_keys"
```

- [참고 (serverfault)](https://serverfault.com/a/583659)

## 관련 노트

- [Docker](/notes/Docker/) - WSL에서 Docker 설치
- [Linux](/notes/Linux/) - WSL(Windows Subsystem for Linux)
