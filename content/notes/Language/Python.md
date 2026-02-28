---
title: Python
category:
  - Language
---

Python은 객체지향 기능을 지원하는 대화형 인터프리터 언어이다.

## 특징

파이썬 프로그래밍은 아주 유연하고 코딩 생산성을 높이다. 처음 파이썬 프로그래밍을 알게 된 것은 아는 지인을 통해서이며 단순히 새로운 인터프리터 언어가 하나 나왔는 정도라고만 생각했었다. 그러나 몇몇 소스를 보면서 그 새로움에 감탄하게 되었고, 지금은 파이썬의 매력에 푹 빠져있다.

기존 파이썬과 호환되는 Python2 버전과 새롭게 개편되어 릴리즈되는 Python3 버전으로 나뉜다. 윈도우, 유닉스, 매킨토시 등 다양한 플랫폼용으로 배포된다. 아파치와 같은 오픈소스 그룹에 가면 항상 소스코드도 함께 배포하는데 실제로 개발자가 아닌 이상 바이너리 버전으로 설치하면 된다. 윈도우는 msi(MicroSoft Installer) 확장자로 된 파일을 제공한다. 파이썬 2.4버전부터는 CKJ(Chinese, Korean, Japanese) 코덱이 포함되어 있다. 만약 그 이하의 버전을 사용한다면 한글코덱을 별도로 설치해야 한다.

## 프로젝트 구조

```
Project/
|-- bin/         # 실행 가능한 스크립트나 바이너리 파일
|-- data/        # 참고 데이터 파일
|-- docs/        # 문서
|   |-- conf.py
|   |-- index.rst
|-- lib/         # C-언어 라이브러리
|-- project/     # 소스 코드
|   |-- sample/
|      |-- __init__.py
|      |-- main.py
|   |-- util/
|-- tests/       # 테스트 코드
|   |-- __init__.py
|   |-- test_main.py
|-- requirements.txt
|-- setup.py
|-- LICENSE
|-- README.md
```

## Tips

- [Python으로 Telegram Bot 활용하기](https://blog.psangwoo.com/coding/2018/08/20/python-telegram-bot-4.html)

## PyCon 컨퍼런스

### 파이콘 한국

- [파이콘 한국 2014](https://archive.pycon.kr/2014/programs/list/)
- [파이콘 한국 2015](https://archive.pycon.kr/2015/programs/list/)
- [파이콘 APAC 2016](https://archive.pycon.kr/2016apac/program/list/)
- [파이콘 한국 2017](https://archive.pycon.kr/2017/)
- [파이콘 한국 2018](https://archive.pycon.kr/2018/)
- [파이콘 한국 2020](https://2020.pycon.kr/2020/)
- [파이콘 한국 2021](https://2021.pycon.kr/session/)
- [파이콘 한국 2022](https://2022.pycon.kr/)
- [파이콘 한국 2023](https://2023.pycon.kr/)

### 파이콘 해외

- [PyCon APAC 2014 (Taiwan)](https://tw.pycon.org/2014apac/en/program/)
- [PyCon APAC 2015 (Taiwan)](https://tw.pycon.org/2015apac/en/schedule/)

## 참조

- 위키독스: 다이브 인투 파이썬 <http://wikidocs.net/mybook/4969>
- 위키독스: 점프 투 파이썬 <http://wikidocs.net/read/book/2>
- 열혈강의 소스 : <http://python.kw.ac.kr/pythonbook/moin.cgi>
- tar 압축할 경우 경로포함/미포함 압축 <http://newkain.egloos.com/2324812>
- CSV module for Python <http://www.object-craft.com.au/projects/csv/>
- 왕초보를 위한 파이썬 - Python Programming for The Very Beginners <http://wikidocs.net/read/book/136>
- [파이썬을 여행하는 히치하이커를 위한 안내서!](https://python-guide-kr.readthedocs.io/ko/latest/)
- [프로젝트 구성하기 (히치하이커 가이드)](https://python-guide-kr.readthedocs.io/ko/latest/writing/structure.html)
- [What is the best project structure for a Python application?](https://stackoverflow.com/a/193181)

## 관련 노트

- [Machine Learning](/notes/Machine_Learning/) - Python 기반 ML 라이브러리 활용
- [NLP](/notes/NLP/) - Python으로 자연어 처리
