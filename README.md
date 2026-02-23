# gizrak.github.io

[jekyll-now](https://github.com/barryclark/jekyll-now)를 포크하여 만든 개인 블로그입니다.
테마: [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) · 배포: GitHub Pages

---

## Get Started

### 1. 사전 요구사항

| 도구    | 버전 |
| ------- | ---- |
| Ruby    | 4.0+ |
| Bundler | 최신 |
| Git     | 최신 |

Ruby 설치는 [rbenv](https://github.com/rbenv/rbenv) 또는 [RVM](https://rvm.io/) 사용을 권장합니다.

```bash
# rbenv 사용 예시
rbenv install 4.0.0
rbenv local 4.0.0
```

### 2. 저장소 클론

```bash
git clone https://github.com/gizrak/gizrak.github.io.git
cd gizrak.github.io
```

### 3. 의존성 설치

```bash
gem install bundler
bundle install
```

### 4. 로컬 서버 실행

```bash
bundle exec jekyll serve
```

브라우저에서 http://localhost:4000 으로 접속합니다.

**옵션:**

```bash
# 초안(draft) 포함 실행
bundle exec jekyll serve --drafts

# 파일 변경 시 자동 재빌드 (기본 포함)
bundle exec jekyll serve --livereload

# 포트 변경
bundle exec jekyll serve --port 5000
```

### 5. 빌드만 하기

```bash
bundle exec jekyll build
# 결과물: _site/ 디렉토리
```

---

## 디렉토리 구조

```
.
├── _config.yml        # 사이트 설정
├── _posts/            # 블로그 포스트 (YYYY-MM-DD-title.md)
├── _pages/            # 정적 페이지 (about, 404 등)
├── _portfolio/        # 포트폴리오 컬렉션
├── _notes/            # 노트 컬렉션
├── assets/            # 이미지, CSS, JS
├── .github/workflows/ # GitHub Actions CI/CD
└── Gemfile            # Ruby 의존성
```

---

## 새 포스트 작성

`_posts/` 디렉토리에 `YYYY-MM-DD-제목.md` 형식으로 파일을 생성합니다.

```markdown
---
title: "포스트 제목"
date: 2026-01-01
categories:
  - 카테고리
tags:
  - 태그
---

포스트 내용을 작성합니다.
```

---

## GitHub Pages 배포

`main` 브랜치에 푸시하면 `.github/workflows/jekyll.yml`이 자동으로 Jekyll을 빌드하고 배포합니다.

### 초기 설정 (최초 1회)

저장소 **Settings → Pages → Build and deployment → Source**를 **"GitHub Actions"**로 설정합니다.

> **주의:** "Deploy from a branch"로 설정하면 GitHub 기본 Jekyll만 사용하므로, 저장소의 Gemfile/테마와 충돌하여 빌드가 실패할 수 있습니다.

### 배포 흐름

```
git push origin main
    └─> GitHub Actions (jekyll.yml)
            ├─ Ruby 4.0 설치
            ├─ bundle install
            ├─ jekyll build
            └─ GitHub Pages 배포
```
