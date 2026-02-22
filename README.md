This is fork branch of jekyll-now for my personal blog.

## GitHub Pages 배포

- **배포가 사이트에 반영되지 않을 때**  
  저장소 **Settings → Pages → Build and deployment** 에서 **Source**를 **"GitHub Actions"**로 선택하세요.  
  `main` 푸시 시 `.github/workflows/jekyll.yml` 이 Gemfile 기준으로 Jekyll을 빌드하고 배포합니다.

- **"Deploy from a branch"** 로 두면 GitHub 쪽에서 제공하는 Jekyll만 사용해 빌드하므로, 저장소의 Gemfile/테마와 맞지 않으면 빌드 실패나 예전 빌드가 노출될 수 있습니다.
