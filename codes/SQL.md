# SQL 문


```sql

영화 삽입

- 일반 영화 테이블에 영화 삽입
insert into video(title, description, view_count, release_date, video_img_url) values (DATA);
- 영화 detail 테이블에 삽입
insert into video_detail(video_id, video_url, sequence) values (DATA);

- 유저 테이블에 유저 삽입
insert into user_table(user_id_c, card_id, pass_word, ph_num, user_name, birth_date, email, service_grade)
values (DATA);

- 카드 테이블에 데이터 삽입
insert card_table(card_id, birth_date, card_name, company, pay_money) values (DATA);

- 영화 목록 조회하기
select title, description, view_count, release_date, video_img_url from video;

- 영화 상세 목록 조회하기
select video_url, sequenct from video_detail where video_id=?;


```