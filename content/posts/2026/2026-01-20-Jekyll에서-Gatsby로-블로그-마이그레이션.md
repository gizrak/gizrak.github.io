---
title: Jekyll에서 Gatsby로 블로그 마이그레이션하기
category:
  - 컴퓨터
date: 2026-01-20
---

오랫동안 Jekyll로 유지해 온 블로그를 Gatsby로 옮겼습니다. 결론부터 말하면 **잘한 결정**이었고, 이 글은 그 과정과 느낀 점을 기록으로 남기기 위해 씁니다.

## 왜 옮기려 했는가

이 블로그는 2021년부터 Jekyll + Minimal Mistakes 테마 조합으로 운영했습니다. GitHub Pages가 Jekyll을 네이티브로 지원하던 시절에는 별 문제가 없었는데, Ruby 버전이 올라가면서 상황이 달라졌습니다.

### Ruby 4 호환성 문제

문제의 발단은 Ruby 4.0 릴리스였습니다. Ruby 4에서는 표준 라이브러리에서 `csv`, `bigdecimal`, `webrick` 등이 제거됐는데, Jekyll 생태계는 이것들에 의존하는 젬이 많았습니다. Gemfile에 하나씩 추가하다 보니 이렇게 됐습니다:

```ruby
gem "csv"
gem "bigdecimal"
gem "webrick"
gem "liquid", ">= 4.0.4"
gem "kramdown-parser-gfm"
gem "jekyll-sass-converter"
gem "jekyll-remote-theme"
gem "jekyll-gist"
gem "jekyll-paginate"
gem "jekyll-seo-tag"
```

단순히 블로그를 빌드하는 데 이렇게 많은 젬이 필요하다는 게 점점 부담스러워졌습니다. 로컬에서 `bundle install` 할 때마다 gem 충돌을 맞닥뜨리거나, CI에서 ruby-setup 액션의 버전을 또 맞춰야 하거나. 블로그 글 한 편 쓰는 것과 전혀 관계없는 일에 에너지를 쏟는 느낌이었습니다.

### Liquid 템플릿의 한계

Minimal Mistakes 테마를 쓰면서 커스터마이징을 하다 보면 결국 Liquid 템플릿을 건드려야 합니다. Liquid는 간단한 출력이나 반복에는 편하지만, 조건 분기가 복잡해지거나 데이터를 가공해야 할 때는 금방 난해해집니다. 특히 `{% raw %}{% assign %}{% endraw %}`, `{% raw %}{% capture %}{% endraw %}`를 남발하는 코드를 다시 볼 때마다 "이게 뭐였지?" 하고 한참 생각했습니다.

## 마이그레이션 과정

마이그레이션은 단번에 깔끔하게 되지 않았고, 몇 차례의 시행착오를 거쳤습니다.

### 1단계: Gatsby 프로젝트 초기화 및 콘텐츠 이전

먼저 `gatsby-source-filesystem`과 `gatsby-transformer-remark`를 기반으로 프로젝트 골격을 잡았습니다. Jekyll 때 `_posts`, `_notes` 등 언더스코어 디렉터리로 관리하던 콘텐츠를 `content/posts`, `content/notes`, `content/portfolio`, `content/pages`로 정리했습니다.

```
content/
  posts/     ← 연도별 서브디렉터리
  notes/     ← 기술 노트 (구 wiki/notes 컬렉션)
  portfolio/ ← 포트폴리오 항목
  pages/     ← about 등 정적 페이지
```

마크다운 파일 자체는 거의 손댈 필요가 없었습니다. frontmatter 키 이름이 다를 때만 일괄 치환했고, 본문 내용은 그대로 썼습니다.

### 2단계: 라우팅 규칙 구현

Jekyll은 `_config.yml`의 `permalink` 설정으로 URL 구조를 정의합니다. 기존 블로그는 `/:categories/:title/` 패턴이었는데, 이를 Gatsby에서 재현하기 위해 `gatsby-node.js`에 직접 로직을 작성했습니다.

```js
// 파일명에서 날짜 접두어(YYYY-MM-DD-)를 제거하고 슬러그 생성
const filename = fileNode.name
const datePrefixMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-/)
const titleSlug = datePrefixMatch
  ? filename.slice(datePrefixMatch[0].length)
  : filename

const slug = `/${firstCategory}/${titleSlug}/`
```

JavaScript이다 보니 정규식, 문자열 처리 모두 자연스럽게 쓸 수 있었고, 기존 Jekyll URL 구조를 그대로 유지할 수 있었습니다. 기존 외부 링크나 검색 엔진 인덱스를 깨뜨리지 않기 위해 URL 호환성을 최우선으로 했습니다.

### 3단계: 플러그인 설정

Jekyll 플러그인에 해당하는 기능들을 Gatsby 플러그인으로 대응했습니다.

| Jekyll | Gatsby |
|--------|--------|
| `jekyll-seo-tag` | `gatsby-plugin-react-helmet` |
| `jekyll-sitemap` | `gatsby-plugin-sitemap` |
| `jekyll-feed` | `gatsby-plugin-feed` |
| `jekyll-paginate` | `gatsby-awesome-pagination` |
| Google Analytics (직접 삽입) | `gatsby-plugin-google-gtag` |
| `jekyll-gist` | — (불필요) |

RSS 피드 설정이 Jekyll보다 다소 장황하긴 했지만, GraphQL 쿼리를 그대로 쓸 수 있어서 원하는 필드를 자유롭게 골라낼 수 있었습니다.

### 4단계: GitHub Actions 배포 설정

Jekyll은 `actions/jekyll-build-pages`가 있어 설정이 단순한 편인데, Gatsby는 빌드 결과물을 직접 올려야 합니다. 아래 흐름으로 정리했습니다.

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'

- run: npm ci
- run: npm run build

- uses: actions/upload-pages-artifact@v3
  with:
    path: ./public
```

Ruby 셋업, Bundler 캐시 설정 등이 사라지고 `npm ci` 한 줄로 의존성이 해결되니 워크플로 파일이 훨씬 간결해졌습니다.

### 5단계: Jekyll 잔재 제거

`Gemfile`, `_config.yml`, `.ruby-version`, `CNAME` 등 Jekyll 전용 파일들을 모두 삭제하고 `.gitignore`에서도 루비 관련 항목을 정리했습니다. 저장소 루트가 눈에 띄게 깔끔해졌습니다.

## Jekyll 대비 Gatsby의 장점

직접 써보고 느낀 실질적인 차이점들입니다.

### 의존성 관리의 일관성

Ruby + Bundler 조합은 macOS, Linux, CI 환경에서 미묘하게 다른 동작을 보일 때가 있었습니다. 특히 시스템 Ruby와 rbenv/rvm이 섞이면 `gem install` 경로 문제가 발생하곤 했죠. Gatsby는 Node.js 위에서 돌아가므로 `package-lock.json`을 저장소에 커밋해두면 어느 환경에서나 동일한 `npm ci`로 재현 가능한 빌드가 됩니다.

### 데이터 레이어: GraphQL

Gatsby의 GraphQL 데이터 레이어는 처음엔 과하다는 느낌이 들 수 있지만, 막상 쓰다 보면 편합니다. 페이지 컴포넌트에서 필요한 데이터만 정확히 선언하면 되고, `gatsby develop` 중에 GraphiQL(`localhost:8000/___graphql`)로 쿼리를 바로 테스트할 수 있습니다. Jekyll에서 `site.posts | where: "category", "컴퓨터"` 같은 Liquid 필터를 짜는 것보다 훨씬 직관적입니다.

### 컴포넌트 기반 UI

Jekyll 테마를 커스터마이징하려면 테마 파일을 `_includes`나 `_layouts`에 복사해서 덮어쓰는 방식을 써야 했는데, 이게 업스트림 테마 업데이트와 충돌하기 쉬웠습니다. Gatsby에서는 `src/components/`에 React 컴포넌트를 두고, 어느 페이지에서 어떤 컴포넌트를 쓰는지 코드로 명확하게 드러납니다. 헤더 레이아웃을 바꾸고 싶으면 `layout.js`를 열면 되고, 포스트 템플릿을 수정하고 싶으면 `blog-post.js`를 보면 됩니다.

### 빠른 피드백 루프

`gatsby develop`의 HMR(Hot Module Replacement)은 템플릿을 수정하면 브라우저가 즉각 반영됩니다. Jekyll의 `bundle exec jekyll serve --livereload`와 비교하면 체감 속도 차이가 납니다. 특히 CSS를 조정하면서 레이아웃을 맞출 때 훨씬 쾌적했습니다.

## 마이그레이션 후 소감

이전을 완료하고 나서 가장 크게 달라진 것은 **"블로그 인프라를 다시 건드리고 싶다"는 생각이 생겼다**는 점입니다. 예전에는 Jekyll 설정을 열면 왠지 모를 부담감이 있었는데, 지금은 컴포넌트 파일을 열어보는 것이 자연스럽습니다. JavaScript는 평소에도 쓰는 언어이고, React는 업무에서도 접하는 도구이니까요.

콘텐츠 디렉터리 구조도 이번에 함께 정리했습니다. 연도별 서브디렉터리로 포스트를 분류하니 `content/posts/` 안이 한결 깔끔해졌고, 노트류는 `content/notes/`에, 포트폴리오는 `content/portfolio/`에 분리되어 각자 역할이 명확해졌습니다.

아직 아쉬운 점이 없는 건 아닙니다. Gatsby 5 기준으로 빌드 시간이 콘텐츠가 많아질수록 늘어나는 편이고, `gatsby build`가 처음 실행될 때 이미지 처리에 시간이 걸립니다. 그리고 플러그인 생태계가 워낙 빠르게 변해서 버전 업데이트 시 breaking change를 챙겨봐야 합니다.

그래도 전체적으로는 잘 옮겼다고 생각합니다. 적어도 Ruby 4 호환성 때문에 새벽에 Gemfile을 뒤적이는 일은 없어질 테니까요.
