---
title: khal + vdirsyncer
category:
  - Technology
---

> Linux에서 CalDAV 캘린더를 동기화하고 터미널에서 관리하는 도구 조합

## khal

> 터미널 기반 CalDAV 캘린더 클라이언트

- 공식 문서: [khal.readthedocs.io](https://khal.readthedocs.io/en/latest/index.html)

### ~/.config/khal/config

```ini
[calendars]
[[home]]
type = discover
path = ~/.calendars/home/*
color = dark blue

[[work]]
type = discover
path = ~/.calendars/work/*
color = dark green

[default]
default_calendar = work
highlight_event_days = true
show_all_days = true

[locale]
timeformat = %H:%M
dateformat = %Y-%m-%d
longdateformat = %Y-%m-%d
datetimeformat = %Y-%m-%d %H:%M
longdatetimeformat = %Y-%m-%d %H:%M
```

## vdirsyncer

> CalDAV/CardDAV 서버와 로컬 파일시스템 간 동기화 도구

- 공식 문서: [vdirsyncer.pimutils.org](https://vdirsyncer.pimutils.org/en/stable/index.html)

### ~/.config/vdirsyncer/config

```ini
[general]
status_path = "~/.vdirsyncer/status/"

[pair icloud]
a = "icloud_local"
b = "icloud_remote"
collections = ["from a", "from b"]

[storage icloud_local]
type = "filesystem"
path = "~/.calendars/home/"
fileext = ".ics"

[storage icloud_remote]
type = "caldav"
url = "https://caldav.icloud.com/"
username = "your@icloud.com"
password = "app-specific-password"

[pair works]
a = "works_local"
b = "works_remote"
collections = ["from a", "from b"]

[storage works_local]
type = "filesystem"
path = "~/.calendars/work/"
fileext = ".ics"

[storage works_remote]
type = "caldav"
url = "https://your-caldav-server.com/"
username = "username"
password = "password"
```

## 동기화 스크립트

```bash
#!/bin/sh
# ~/bin/calsync.sh
vdirsyncer discover icloud
vdirsyncer sync icloud
vdirsyncer discover works
vdirsyncer sync works
```

## 관련 노트

- [Linux](/notes/Linux/) - Linux 개발 환경 설정
- [Shell](/notes/Shell/) - 쉘 스크립트 및 oh-my-zsh
