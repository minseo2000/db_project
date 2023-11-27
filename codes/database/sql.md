
# ERD SQL

```
[하]
-DDL (CREATE, ALTER, DROP) 中 택1
-DML (INSERT, UPDATE, DELETE) 中 택1
-SELECT 문
1. DISTINCT / * / AS / MAX / MIN / AVG / SUM  -> 中 택1
2. 숫자 컬럼에 대한 산술 연산,
3. 널 값의 비교 (IS NULL, IS NOT NULL) ->  中 택1
4. 숫자 문자 / 날짜의 비교 ->  中 택1
5. 튜플의 개수를 카운트 (COUNT)

[중]
-SELECT 문
1. WHERE 절에서 검색 조건 (비교 연산자, 논리 연산자 사용) ->  中 택1
2. WHERE 절에서 다수의 값 비교 (BETWEEN AND, NOT BETWEEN AND, IN, NOT IN) ->  中 택1
3. 문자 컬럼의 부분 비교
4. 정렬
5. 그룹

[상]
-SELECT 문
1. 조인 연산
2. UNION, INTERSECT, MINUS ->  中 택1
3. 중첩 SQL
```

## 테이블 관련 SQL
```sql
create table video(
    video_id int primary key,
    title varchar(20) not null,
    description varchar(255),
    view_count int default 0,
    release_date date not null,
    video_img_url varchar(255) not null
);

create table video_actor(
    video_actor_id int primary key,
    actor_name varchar(10) not null
);

create table video_actor_relation(
    
);

create table video_genre(
    video_genre_id int primary key,
    genre_name varchar(10) not null 
);

create table video_genre_relation(

);

create table video_detail(
    video_detail_id int primary key,
    video_url varchar(255) not null,
    sequence int not null
    
);

create table profile(
    profile_id int primary key,
    profile_img_url varchar(255) not null,
    nickname varchar(255)
);

create table user_table(
    user_id int primary key,
    pass_word varchar(255) not null,
    ph_num varchar(20),
    user_name varchar(20) not null,
    birth_date date,
    email varchar(40),
    service_grade int not null
    
    
);

create table card_table(
    card_id int primary key,
    birth_date date,
    card_name varchar(20),
    company varchar(20) not null,
    pay_money int not null
);

```


## 관계 설정 관련 SQL

```sql

```

## 조회 관련 SQL

```sql

```