---
title: Linux
category:
  - Computer
---

## Tips

### Nginx 로그 파싱

- [CLI로 nginx access.log / error.log 파싱하기](https://easyengine.io/tutorials/nginx/log-parsing/)

URL별 요청 수 카운트:

```bash
awk '{print $9}' access.log | sort | uniq -c | sort -rn
```

### 포트 관리

현재 열려있는 포트 확인 및 닫기:

```bash
# 열린 포트 확인
sudo lsof -PiTCP -sTCP:LISTEN

# 특정 포트 확인
sudo lsof -i :3000

# 프로세스 종료
sudo kill -9 <PID>
```

## Trouble Shooting

- [python error: Could not import the lzma module](https://snepbnt.tistory.com/entry/python-error-Could-not-import-the-lzma-module-Your-installed-Python-is-incomplete)

## 관련 노트

- [Shell](/notes/Shell/) - oh-my-zsh 및 zsh 설정
- [Nginx](/notes/Nginx/) - Nginx 웹 서버 설정
- [Docker](/notes/Docker/) - Linux 기반 컨테이너
- [khal + vdirsyncer](/notes/khal_vdirsyncer/) - Linux에서 캘린더 동기화
