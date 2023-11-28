# 논리적 모델링

```python

카드정보(카드번호(PK), 생일, 이름, 카드회사, 출생연도, 결제금액)
유저(유저번호(PK), 카드번호(FK), 이메일 주소, 비밀번호, 전화번호, 이름, 생년월일, 서비스 등급,)
프로필(프로필 번호(PK), 유저번호(FK), 프로필 이미지, 닉네임)
동영상(동영상 번호(PK), 이미지 url, 제목, 설명, 조회수, 출시일)
시청기록(시청기록 번호(PK), 프로필 번호(FK), 동영상 번호(FK), 시간, 날짜)
찜하기(찜하기 번호(PK), 프로필번호(FK), 동영상 번호(FK)),
저장(저장 번호(PK), 프로필 번호(FK), 동영상 번호(FK))
배우(배우번호(PK), 이름)
배우동영상(배우동영상번호(PK), 배우번호(FK), 동영상 번호(FK))
장르(장르번호(PK), 장르이름)
장르동영상(장르동영상번호(PK), 장르번호(FK), 동영상번호(FK))
하위동영상(동영상 번호(PK), 동영상 번호(FK), 동영상url, 순서)
```