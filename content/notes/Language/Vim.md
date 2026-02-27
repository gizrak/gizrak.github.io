---
title: Vim
category:
  - Language
---

> 강력한 터미널 기반 텍스트 에디터

## .vimrc 설정

설정 파일 위치: `~/.vimrc`

```vim
set autoindent          " 자동 들여쓰기
set backspace=eol,start,indent
set cindent             " C 스타일 들여쓰기
set enc=utf-8
set encoding=utf-8
set expandtab           " Tab을 Space로 변환
set fileencoding=utf-8
set history=1000
set hlsearch            " 검색어 하이라이트
set ignorecase          " 검색 시 대소문자 무시
set incsearch           " 증분 검색
set nobackup
set nocompatible
set ruler               " 커서 위치 표시
set shiftwidth=4        " 자동 들여쓰기 크기
set smartindent
set softtabstop=2
set tabstop=4
set visualbell          " 잘못된 키 입력 시 소리 대신 화면 깜빡임
set wrap

syntax on               " 문법 강조
filetype plugin on

" 파일 열 때 마지막 커서 위치로 이동
autocmd BufReadPost *
  \ if ! exists("g:leave_my_cursor_position_alone") |
  \   if line("'\"") > 0 && line ("'\"") <= line("$") |
  \     exe "normal g'\"" |
  \   endif |
  \ endif
```

## 관련 노트

- [Shell](/notes/Shell/) - oh-my-zsh 및 zsh 설정
- [Git](/notes/Git/) - .gitconfig에서 기본 에디터로 vim 설정
