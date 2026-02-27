---
title: Git
category:
  - Language
---

> 분산 버전 관리 시스템

## .gitconfig 설정

```ini
[core]
    autocrlf = input
    editor = /usr/bin/vim
    excludesfile = /home/user/.gitignore_global
[commit]
    template = /home/user/.stCommitMsg
[merge]
    branchdesc = true
    commit = no
[pager]
    branch = false
[alias]
    # 브랜치 관리
    br = branch -vv
    brc = "!git branch --merged | egrep -v '(^\\*|master|main|dev)' | xargs git branch -d"
    ch = "!git checkout $(git bselect)"
    cur = "!git branch | awk '/^\\*/{print $2}'"
    # 커밋/체크아웃
    cm = commit
    co = checkout
    cp = cherry-pick
    # 로그
    l = log --graph --oneline --decorate --date=relative
    ll = log --pretty=format:"%C(yellow)%h\\ %ad%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --date=relative
    last = log -1 HEAD
    # 상태
    s = status -s
    st = status
    # 원격
    fet = "!git fetch --all --prune --tags"
    update = "!git fetch --all --prune; git merge origin"
[user]
    name = Your Name
    email = your@email.com
[init]
    defaultBranch = main
```

## Tips

### 브랜치 이름 변경

```bash
git branch -m 변경전 변경후
```

### 패스워드 초기화

```bash
git -c diff.mnemonicprefix=false \
    -c core.quotepath=false \
    -c credential.helper=sourcetree \
    fetch --prune origin
```

## 좋은 커밋 메시지 작성법

[좋은 커밋 메시지를 작성하기 위한 7가지 약속](https://meetup.toast.com/posts/106)

1. 제목과 본문을 한 줄 띄워 분리
2. 제목은 영문 기준 50자 이내
3. 제목 첫 글자를 대문자로
4. 제목 끝에 `.` 금지
5. 제목은 명령조로 (Add, Fix, Update, Remove 등)
6. 본문은 영문 기준 72자마다 줄 바꾸기
7. 본문은 **어떻게**보다 **무엇을**, **왜**에 맞춰 작성

[좋은 커밋 메시지를 위한 영어 사전](https://blog.ull.im/engineering/2019/03/10/logs-on-git.html)

## 두 브랜치 간 커밋 비교 스크립트

```bash
#!/bin/sh
# git-diff.sh: 두 브랜치에 각각 존재하는 커밋 비교

BRANCH1=$1
BRANCH2=$2

if [ "$#" -ne 2 ]; then
    echo "USAGE: ${0##*/} [BRANCH1] [BRANCH2]"
    exit 1
fi

echo "Commits in ${BRANCH2} but not in ${BRANCH1}:"
git --no-pager log ${BRANCH1}..${BRANCH2} --oneline
echo
echo "Commits in ${BRANCH1} but not in ${BRANCH2}:"
git --no-pager log ${BRANCH2}..${BRANCH1} --oneline
```

## 관련 노트

- [Shell](/notes/Shell/) - oh-my-zsh에서 git alias 활용
- [IntelliJ](/notes/IntelliJ/) - IntelliJ IDE에서 Git 사용
- [VSCode](/notes/VSCode/) - VSCode에서 Git 사용

## 참고

- [편리한 git alias 설정하기](https://johngrib.github.io/wiki/git-alias/)
