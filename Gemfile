source "https://rubygems.org"

# Ruby 3.0+ 에서 기본 라이브러리에서 제거됨 (CI/로컬 Ruby 4 대응)
gem "csv"
gem "bigdecimal"
gem "webrick"

gem "github-pages", group: :jekyll_plugins

gem "jekyll", "~> 3.5"
gem "minimal-mistakes-jekyll"

group :jekyll_plugins do
  gem "jekyll-admin"
  gem 'jekyll-feed'
  gem 'jekyll-include-cache'
  gem 'jekyll-sitemap'
  gem "jekyll-toc"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
