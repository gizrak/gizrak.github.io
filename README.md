# Try to Remember

Ted Hwang의 개인 블로그. Gatsby로 구축됩니다.

## 로컬 개발

```bash
npm install
npm start   # http://localhost:8000
```

## 빌드

```bash
npm run build
npm run serve     # 빌드 결과 로컬 미리보기
```

## GitHub Pages 배포

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 자동으로 Gatsby를 빌드하고 배포합니다.

저장소 **Settings → Pages → Build and deployment** 에서 **Source**를 **"GitHub Actions"**로 설정해야 합니다.

## 구조

```
content/
  posts/      # 블로그 포스트 (.md)
  notes/      # 기술 레퍼런스 노트 (.md)
  portfolio/  # 포트폴리오 항목 (.md)
  pages/      # 정적 페이지 (about.md 등)
static/
  assets/     # 이미지 등 정적 파일
src/
  components/ # React 컴포넌트
  templates/  # 페이지 템플릿
  pages/      # 정적 페이지 (notes, portfolio 등)
  styles/     # CSS
```
