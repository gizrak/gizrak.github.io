# gizrak.github.io

Personal blog (Jekyll 4 + [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) remote theme).

## 로컬에서 실행하기

### 요구사항

- **Ruby 4.x** (권장). `.ruby-version`에 4.0.1 사용.
- **Bundler**: `gem install bundler`

### 실행 방법

1. 저장소 클론 후 프로젝트 루트로 이동:
   ```bash
   cd gizrak.github.io
   ```

2. 의존성 설치:
   ```bash
   bundle install
   ```

3. 로컬 서버 실행:
   ```bash
   bundle exec jekyll serve
   ```

4. 브라우저에서 **http://localhost:4000** 접속.

- **실시간 반영**: 글/레이아웃 수정 시 저장하면 자동 반영.
- **_config.yml 수정 시**에는 서버를 중지한 뒤 다시 `bundle exec jekyll serve` 실행.

### 참고

- 배포: GitHub Pages는 기본 빌드 환경(Jekyll 3.x)을 사용할 수 있음. 동일한 결과를 위해 CI에서 `bundle exec jekyll build` 후 `_site`를 배포하는 방식도 가능.
- CI: `.github/workflows/jekyll.yml` (Ruby 4 + Jekyll 4 빌드 검증)
