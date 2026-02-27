---
title: Angular
category:
  - Language
---

> TypeScript 기반 웹 프레임워크

## 시작하기

```bash
ng new ted-ng
cd ted-ng
npm install --legacy-peer-deps  # 의존성 충돌 해결
ng serve -o --port 4201         # --open
```

공식 사이트: [angular.kr](https://angular.kr/)

## Angular CLI

[Angular CLI를 사용한 프로젝트의 생성, 구성요소 추가와 빌드](https://poiemaweb.com/angular-cli)

| 구성요소  | 명령어                                  | 축약형             |
| --------- | --------------------------------------- | ------------------ |
| 컴포넌트  | ng generate component component-name    | ng g component-name |
| 디렉티브  | ng generate directive directive-name    | ng g d directive-name |
| 파이프    | ng generate pipe pipe-name              | ng g p pipe-name   |
| 서비스    | ng generate service service-name        | ng g s service-name |
| 모듈      | ng generate module module-name          | ng g m module-name |
| 가드      | ng generate guard guard-name            | ng g g guard-name  |
| 클래스    | ng generate class class-name            | ng g cl class-name |
| 인터페이스 | ng generate interface interface-name   | ng g i interface-name |
| 열거형    | ng generate enum enum-name              | ng g e enum-name   |

## Tips

- [Angular에서 TypeScript를 사용하는 이유](https://github.com/not-for-me/til/blob/master/angular2/translations/writing_angular2_in_typescript.md)
- [Catching errors in Angular HttpClient](https://stackoverflow.com/questions/46019771/catching-errors-in-angular-httpclient)

## Angular 바인딩

> 데이터와 뷰의 상호간 갱신을 자동화해주는 기능

```html
<my-comp value="hello"></my-comp>             <!-- 리터럴 값 -->
<my-comp [value]="myValue"></my-comp>          <!-- 속성 바인딩 -->
<my-comp (change)="onChange($event)"></my-comp> <!-- 이벤트 바인딩 -->
<my-comp [(value)]="myValue"></my-comp>         <!-- 양방향 바인딩 -->
<div *ngIf="isVisible">Hidden Contents</div>    <!-- 구조적 디렉티브 -->
<input #myInput type="text">                    <!-- 템플릿 참조 변수 -->
```

### 속성 바인딩 `[property]`

- 속성명을 `[`와 `]`로 감싸서 표현
- 문자열을 JavaScript 표현식으로 평가(eval)하여 결과를 대입

```typescript
@Component({
  template: `<input [value]="myValue">`
})
export class AppComponent {
  myValue = 3 * 4;  // 12가 바인딩됨
}
```

인터폴레이션(interpolation):
```html
<div>{{ myValue }}</div>
```

attr/class/style 바인딩:
```html
<tr><td [attr.colspan]="1+2">data</td></tr>
<div [class.active]="isActivated"></div>
<button [style.color]="isDefault ? 'green' : 'red'">버튼</button>
```

### 이벤트 바인딩 `(event)`

- 속성명을 `(`와 `)`로 감싸서 표현

```typescript
@Component({
  template: `<input (change)="onChange($event)">`
})
export class AppComponent {
  onChange(event) { console.log(event); }
}
```

### 양방향 바인딩 `[(property)]`

- "Banana in a Box" 문법: `[(`와 `)]`
- 뷰 ↔ 컴포넌트 양방향 동기화

```typescript
@Component({
  template: `<input [(value)]="myValue">`
})
export class AppComponent {
  myValue = 10;
}
```

### `*` 문법 (구조적 디렉티브)

`<ng-template>`의 문법적 설탕(syntactic sugar):

```html
<!-- 원래 형태 -->
<ng-template [ngIf]="isVisible">
  <div>...</div>
</ng-template>

<!-- * 문법 축약 -->
<div *ngIf="isVisible">...</div>
```

### 템플릿 참조 변수 `#variable`

```html
<input #myInput type="text">
<button (click)="onClick(myInput.value)">Submit</button>
```

### 템플릿 입력 변수 `let-xxx`

```html
<ng-template let-foo="fooValue">
  <div>{{ foo }}</div>
</ng-template>
```

## 관련 노트

- [JavaScript](/notes/JavaScript/) - JavaScript 기초
- [React](/notes/React/) - 다른 JavaScript UI 라이브러리
