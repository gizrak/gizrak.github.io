---
date: 2025-03-01 00:27:23
created: 2024-04-30 15:26:36
---

# khal + vdirsyncer

> 리눅스에서 캘린더 싱크하는 방법

<br>

## khal

> [https://khal.readthedocs.io/en/latest/index.html](https://khal.readthedocs.io/en/latest/index.html)  

<br>

### ~/.config/khal/config

```
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

<br>

## vdirsyncer

> [https://vdirsyncer.pimutils.org/en/stable/index.html](https://vdirsyncer.pimutils.org/en/stable/index.html)  

<br>

### ~/.config/vdirsyncer/config

```
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
username = "gizrak@me.com"
password = "****"

[pair works]
a = "works_local"
b = "works_remote"
#collections = null
collections = ["from a", "from b"]

[storage works_local]
type = "filesystem"
path = "~/.calendars/work/"
fileext = ".ics"

[storage works_remote]
type = "caldav"
url = "https://caldav.calendar.navercorp.com/"
username = "nl10496"
password = "****"
```

<br>

## calsync

```
#!/bin/sh
vdirsyncer discover icloud
vdirsyncer sync icloud
vdirsyncer discover works
vdirsyncer sync works
```

<br>

<br>

<br>

<br>

<br>