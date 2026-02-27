---
title: Spring Framework
category:
  - Language
---

> 자바 엔터프라이즈 개발을 위한 오픈소스 경량급 애플리케이션 프레임워크

## 개요

### 정의

- 자바(JAVA) 플랫폼을 위한 오픈소스 애플리케이션 프레임워크
- 자바 객체(POJO)를 자바EE에 의존적이지 않게 연결해주는 역할
- IoC(제어 역행), DI(의존성 주입), AOP(관점 지향 프로그래밍) 지원

### 주요 특징

- 경량 컨테이너로서 자바 객체 관리
- POJO 방식의 프레임워크
- 영속성과 관련된 다양한 서비스 지원
- 확장성이 높음

## DI (Dependency Injection, 의존성 주입)

> 객체 간의 의존성을 외부에서 주입하는 디자인 패턴

### Setter Injection

```java
B b = new B();
A a = new A();
a.setB(b);
```

### Constructor Injection

```java
B b = new B();
A a = new A(b);
```

### XML 방식

```xml
<bean id="record" class="di.SprRecord"/>
<bean id="view" class="di.SprRecordView">
  <property name="record" ref="record"/>  <!-- setRecord() 호출 -->
</bean>
```

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("config.xml");
RecordView view = (RecordView) ctx.getBean("view");
```

### Annotation 방식 (Spring 2.0+)

```java
@Autowired
ArbitraryClass arbObject;
```

컴포넌트 스캔:

```java
@ComponentScan(basePackages = "com.baeldung.componentscan.springapp")
@Configuration
public class SpringComponentScanApp { }
```

## IoC (Inversion of Control, 제어 역행)

> 객체의 생성과 의존관계 설정을 외부(컨테이너)에서 담당

| 개념               | 설명                                               |
| ------------------ | -------------------------------------------------- |
| 빈(Bean)           | 스프링이 직접 만들고 관계를 부여하는 오브젝트      |
| 빈 팩토리           | 빈의 생성과 관계 설정을 담당하는 IoC 오브젝트     |
| 애플리케이션 컨텍스트 | 빈 팩토리 + 엔터프라이즈 기능 = IoC 컨테이너    |

→ [Spring Bean](/notes/Spring_Bean/) 상세 내용 참조

## AOP (Aspect Oriented Programming, 관점 지향 프로그래밍)

> 핵심 관심사항(비즈니스 로직)과 공통 관심사항(로깅, 트랜잭션 등)을 분리

- 부가적 기능(로그인, 트랜잭션, 보안, 캐싱)을 별도로 모듈화
- OOP의 보완적 개념으로 횡단 관심사(cross-cutting concerns) 처리

### 참고

- [Spring AOP 총정리](https://engkimbs.tistory.com/746)
- [스프링 트라이앵글 - AOP](https://velog.io/@woo00oo/스프링-트라이앵글-AOP)

## Spring Boot

- [Spring Boot 다중 모듈 프로젝트 구성 가이드](https://github.com/ihoneymon/multi-module)

## Spring Batch

→ [Spring Batch](/notes/Spring_Batch/) 상세 내용 참조

- [Spring Batch 가이드](https://jojoldu.tistory.com/324?category=902551)
- [배민 API GATEWAY – spring cloud zuul 적용기](https://techblog.woowahan.com/2523/)
- [Swagger in Spring MVC](https://stackoverflow.com/questions/26720090/a-simple-way-to-implement-swagger-in-a-spring-mvc-application)

## 관련 노트

- [Spring Bean](/notes/Spring_Bean/) - Bean 생명주기 및 스코프
- [Spring Batch](/notes/Spring_Batch/) - 배치 처리 프레임워크
- [Java](/notes/Java/) - Java 8/11 특징
- [Gradle](/notes/Gradle/) - 멀티 모듈 프로젝트 빌드

## 참고

- [스프링(Spring) 프레임워크 기본 개념 강좌](https://ooz.co.kr/170)
