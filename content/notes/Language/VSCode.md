---
title: Visual Studio Code
category:
  - Language
---

> Microsoft가 개발한 크로스플랫폼 코드 에디터

## Prettier 설정

- [Prettier 공식 가이드 (React)](https://dev-yakuza.posstree.com/ko/react/prettier/)
- [설정 참고](https://github.com/prettier/prettier/issues/2575#issuecomment-423953143)

`.vscode/settings.json`:

```json
{
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "files.autoSave": "afterDelay",
    "files.insertFinalNewline": true
}
```

## 컨테이너 내부 개발 (Dev Containers)

- [VSCode로 컨테이너 안에서 개발하기](https://ssowonny.medium.com/vs-code로-컨테이너-안에서-개발하기-d8ed0950d69a)
- Remote - Containers 확장으로 Docker 컨테이너 내부에서 직접 개발 가능

## 관련 노트

- [Docker](/notes/Docker/) - 컨테이너 기반 개발 환경
- [React](/notes/React/) - Prettier 설정이 유용한 React 개발
- [Git](/notes/Git/) - VSCode 내장 Git 기능
