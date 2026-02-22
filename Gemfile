source "https://rubygems.org"

# Ruby 3.0+ 에서 기본 라이브러리에서 제거됨 (CI/로컬 Ruby 4 대응)
gem "csv"
gem "bigdecimal"
gem "webrick"

# Liquid 4.0.4+ (Ruby 3.2+에서 제거된 tainted? 호출 제거됨). github-pages는 liquid 4.0.3 고정이라 Ruby 4와 충돌하여 제외.
gem "liquid", ">= 4.0.4"

gem "jekyll", "~> 3.5"
gem "kramdown-parser-gfm"
gem "minimal-mistakes-jekyll"

group :jekyll_plugins do
  gem "jekyll-admin"
  gem "jekyll-feed"
  gem "jekyll-include-cache"
  gem "jekyll-sass-converter"
  gem "jekyll-sitemap"
  gem "jekyll-toc"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
