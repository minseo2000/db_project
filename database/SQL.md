# SQL?

## SQL 언어의 구성
- 데이터 정의어(DDL)
  - CREATE
  - ALTER
  - DROP
- 데이터 조작어(DML)
  - INSERT
  - UPDATE
  - DELETE
  - SELECT
- 데이터 제어어(DCL)
  - GRANT
  - REVOKE


각각의 기본적인 사용방법

```
create table 테이븖명 
alter table 테이블명 add ~ 
drop table 테이블명

insert into 테이블명(속성명) values (데이터 값)
update 
select (DISTINCT) 속성명 from 테이블명 where (조건 기술);
delete from 테이블명 where (조건 기술);
```

# SELECT 문을 사용하는 다양한 예시들

| 사용방법                                                                                                                              | sql문                                                                                                                                                                                                                                                                                                |
|-----------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 기본 사용방법                                                                                                                           | select * from emp;<br/>select ename, sal from emp                                                                                                                                                                                                                                                   |
| 조건을 기술 할 경우                                                                                                                       | select * from emp where job='salesman'                                                                                                                                                                                                                                                              |
| 데이터 값의 중복을 제거하고 싶은 경우                                                                                                             | select distinct job from emp; <br/>select * from emp where ename='SCOTT'                                                                                                                                                                                                                            |
| 검색 조건의 작성을 하고 싶은 경우                                                                                                               | select ename, hiredate from emp where hiredata >= '1981-09-01';<br/>select ename, hiredate, sal from emp where hiredate>='1981-09-01' and sal >= 1500<br/>select ename, job, sal from emp where NOT(job='SALESMAN' OR job='ANALYST')                                                                |
| 널 값의 비교를 하고 싶은 경우 (비교 연산 수행 시 NULL값은 아예 비교 대상에서 제외된다.)                                                                            | select ename, comm from emp where comm is not null;                                                                                                                                                                                                                                                 |
| 다수의 값을 비교하는 경우 유용한 사용방법<br/>1. BETWEEN A AND B<br/>2. NOT BETWEEN A AND B<br/>3. IN (...)<br/>4. NOT IN (...)                     | select ename, sal from emp where sal BETWEEN 1000 AND 2000;<br/>select ename, sal from emp where NOT BETWEEN 1000 AND 2000;<br/>select ename, job, sal from emp where job IN ('CLERK', 'ANALYST', 'MANAGER');<br/>select ename, job, sal from emp where jon not in ('CLERK', 'ANALYST', 'MANAGER'); |
| 문자 컬럼의 부분 비교를 하고 싶은 경우<br/>1. LIKE<br/>2. %<br/>3. _                                                                              | 이름이 A로 시작하는 사원의 이름과 담당 업무를 보이시오-> select ename, job from emp where ename LIKE 'A%';<br/>이름의 세 번째 글자가 'A'인 시작하는 사원의 이름과 담당 업무를 보이시오. -> select ename, job from emp where ename LIKE '__A%';                                                                                                          |
| 내장 함수를 사용하는 경우<br/>1. COUNT()<br/>2. MAX()<br/>3. MIN()<br/>4. AVG()<br/>5. SUM()                                                 | select COUNT(*) from emp;<br/>select COUNT(*) AS cnt_salesman from emp where job ='SALESMAN'<br/>select MAX(sal) from emp;<br/>select MAX(sal) from emp where job ='SALESMAN'<br/> select MIN(hiredate) from emp <br/>select AVG(sal) from emp<br/>                                                 |
| 정렬을 하고 싶은 경우 (ORDER BY) (오름차순 : ASC, 내림차순: DESC), 기본은 오름차순, WHERE 절 다음에 ORDER BY 절 사용하기!                                          | select ename, hiredate from emp where job='SALESMAN' order by hiredate; <br/>select ename, sal from emp where job='salesman' order by sal desc;<br/>select deptno, ename, job from emp orderby deptno, ename;                                                                                       |
| 그룹으로 정렬 하고 싶은 경우(GROUP BY), HAVING 계산 <br/>테이블 전체 듀플에 적용되는 검색 조건은 WHERE 다음에 기술<br/>GROUP BY에 의해 만들어진 결과에 적용할 검색 조건은 HAVING 다음에 기술 |                                                                                                                                                                                                                                                                                                     |
| WHERE 절 다음 GROUP BY 절 다음 HAVING 절 다음 ORDER BY 절 작성                                                                                ||


# Create table 문
- 테이블을 구성하고, 속성과 속성에 관한 제약을 정의하며, 기본키 및 외래키를 정의하는 명령어
- NOT NULL은 NULL값을 허용하지 않는 제약, UNIQUE는 유일한 값에 대한 제약, DEFAULT는 기본 값 설정, CHECK는 값에 대한 조건을 부여할 때 사용.

```
create table 테이블이름
({
  속성이름 데이터 타입 [NOT NULL or UNIQUE or DEFAULT 기본값 or CHECK 체크조건]
  [PRIMARY KEY 속성이름(들)]
  [FOREIGN KEY 속성이름 REFERENCES 테이블이름(속성이름) ON UPDATE -> NO ACTION or SET NULL or SET DEFAULT]
  [FOREIGN KEY 속성이름 REFERENCES 테이블이름(속성이름) ON DELETE -> NO ACTION or SET NULL or SET DEFAULT]
})
```
# Alter table 문

```
ALTER TABLE 테이블이름

  [ADD 속성이름 데이터타입]
  [DROP COLUMN 속성이름]
  [ALTER COLUMN 속성이름 데이터 타입]
  [ALTER COLUMN 속성이름 [NULL | NOT NULL]]
  [ADD PRIMARY KEY (속성이름)]
  [[ADD|DROP 제약이름]
```

# DROP table 문

```
DROP TABLE 테이블 이름
```

# INSERT INTO 문
```
INSERT INTO 테이블이름(속성들) VALUES (값들)
```

# UPDATE 문

```
UPDATE 테이블이름
SET 속성이름=값
WHERE 검색조건
```