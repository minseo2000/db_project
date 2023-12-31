import pymssql

# 데이터베이스 설정
server = 'minseotest.iptime.org:50010'  # 예: 'localhost' 또는 IP 주소
user = 'sa'
password = '2019212950@M'
database = 'netflix'

# 데이터베이스에 연결
conn = pymssql.connect(server, user, password, database)
# 데이터베이스 작업을 수행할 커서 객체 생성
cursor = conn.cursor()

ACTOR_DATA = [
    '이민호', '전지현', '신혜선', '신원호', '이희준', '박진영', '신은수',
    '데이비드 베컴', '박보영', '연우진', '장동윤', '이정은', '장률', '이이담', '이상희',
    '박지연', '전배수', '김종태', '공성하', '임재혁', '정운선', '조당환', '노재원', '권한솔',
    '수지', '양세종', '하영', '박세완', '김도완', '김민호', '주연우', '강명주', '권한솔',
    '백지혜', '혜리', '류준열', '박보검', '고경표', '이동휘', '류혜영', '안재홍', '라미란',
    '성동일', '최성원', '김성균', '정해인', '이일화', '정유민', '김주혁', '이미연', '김선영',
    '유재명', '최무성', '고아라', '이민지', '박정민', '전미선', '정우', '안효섭', '전여빈',
    '강훈', '남지현', '최현욱', '김무열', '정다빈', '서범준', '채서은', '문가영', '유연석',
    '금새록', '정가람', '문태유', '오소현', '박형수', '서정연', '최수종', '김동준', '이시아',
    '이민영', '지승현', '백성현', '이원종', '김산호', '박은빈', '채종협', '엔', '김효진', '이레',
    '김주헌', '이유미', '변우석', '옹성우', '김정은', '박보영', '박형식', '주우재', '김해숙', '이승준',
    '영탁', '이희진', '심혜진', '이선균', '아이유', '이지아', '장기용', '박호산', '김영민', '권나라', '오나라',
    '염정아', '김혜윤', '윤세아', '김서형', '오나라', '조병규', '이태란', '김동희',
    '조승우', '배두나', '윤세아', '이준혁', '신혜선', '이규형', '장성범', '김요한', '소주연',
    '여회현', '정재오', '박지원', '양유진', '김태리', '이병헌', '유연석', '김민정', '변요한',
    '김지원', '장동윤', '데이비드 맥기니스', '공유', '김고은', '이동욱', '유인나', '육성재',
    '김소현', '김민재', '이엘', '고윤정', '김범', '김명민', '이수경', '이다윗', '이정은', '김현우',
    '지창욱', '한지은', '민호', '김민석', '류경수', '표예진', '한소희', '김희애', '박해준', '전진서',
    '이무생', '김영민', '심은우', '박선영', '손석구', '이민기', '이기우', '전수진', '전혜진', '천호진'
    , '박해진', '임지연', '김권', '박성웅', '권아름', '서영주', '최유화', '김유미', '신혜선', '김정현'
    , '설인아', '나인우', '김수현', '유인나', '안재현', '신성록', '김현수', '김선호', '남주혁',
    '강한나', '김도완', '스테파니 리', '김해숙', '강유석', '정유민', '성훈', '진지희', '오승윤',
    '이민영', '강신효', '이미숙', '오하늬', '송중기', '전여빈', '옥택연', '곽동연', '김성철', '김여진',
    '김윤혜', '나철', '손예진', '윤진아', '정유진', '강세영', '주민경', '금보라', '이화룡', '공철구',
    'Taisei Kido', '미츠시마 히카리', '사토 타케루', '야기 리카코', 'Aoi Yamada', 'Towa Araki',
    '조병규', '김세정', '유준상', '강기영', '김히어라', '유인수', '염혜란', '이선빈', '박규영', '강민혁', '이청아',
    '설인아', '송우기', '한으뜸', '전효성', '박규영', '차은우', '이현우', '윤현수', '이서엘', '김이경', '류아벨', '김민석',
    '정소민', '이민기', '박병은', '이송', '김민규', '김가은', '김민석', '이청아', '덱스', '이나딘', '이다희', '신슬기', '강소연',
    '차현승', '이소이', '최시훈', '서현진', '이민기', '이다희', '안재현', '류화영', '이태리', '린이', '싱페이', '탕샤오톈',
    'Zhou Junwei', 'Zhou Zixin', '가어 유 페이', '장 하오 룬', '진칠원', '짜오루스', '빅터 마', 'Ding Xiao Ying',
    '쩡리', '장형민', '구심지', '김다미', '최우식', '노정의', '김성철', '안동구', '박진주', '전혜원', '이준혁',
    '이준호', '윤아', '고원희', '김재원', '김가은', '아누팜 트리파티', '안세하', '남기애',
    '강하늘', '홍종현', '남주혁', '지수', '백현', '서현', '현빈', '손예진', '김수현', '서지혜',
    '하석진', '이신영', '정경호', '공효진', '김지석', '엄혜란', '손담비', '오정세', '강 타에 웅',
    '전여빈', '천우희', '한지은', '이주빈', '공명', '윤지온', '한지민', '주민경', '이무생', '임성언', '이유진', '김창완',
    '김태리', '최현욱', '보나', '이주명', '최민영', '최태준', '김혜은', '이재욱', '고윤정', '황민현', '유인수', '신승호', '이채민', '아린',
    '노먼 리더스', '앤드루 링컨', '멀리사 맥브라이드', '로런 코핸', '제프리 딘 모건', '다나이 구리라', '챈들러 리그스', '스티븐 연',
    '레이튼 미스터', '블레이크 라이블리', '에드 웨스트윅', '테일러 맘슨', '체이스 크로퍼드', '펜 배질리', '켈리 리더포드', '제시카 조어',
    '릴리 콜린스', '위카 브라보', '애슐리 박', '루시엔 라비스카운트', '카미유 라자트', '필리핀 르루아볼리외', '윌리엄 애바디', '케이트 윌시',
    '조이 페리', '랜스 바버', '애니 포츠', '짐 파슨스', '몬태나 조던', '맷 하비', '와이어트 맥클루어', '윌리스 숀',
    '멀리사 룩스버러', '조시 댈러스', '아데나 카카니스', 'J. R. 라미레스', 'Jack Messina', '파르빈 카우르', '맷 롱', '루나 블레이즈',
    '안야 테일러조이', '토머스 브로디생스터', '해리 멜링', '제이콥 포춘 로이드', '머리엘 헬러', '모지스 잉그럼', '빌 캠프', '마르친 도로친스크',
    '브라이언 크랜스턴', '아론 폴', '애나 건', '딘 노리스', 'RJ 마이트', '밥 오든커크', '배치 브랜트', '조너선 뱅크스',
    '펜 배질리', '빅토리아 페드레티', '엘리자베스 레일', '타티 가브리엘', '딜런 아널드', '제나 오르테카', '셰이 미첼', '샬럿 리치',
    '게이브리얼 배소', '루시안 뷰캐넌', '사라 더그데일', '이브 할로', '홍 차우', 'D. B. 우드사이드', '로버트 패트릭', '폴라 에반스 아킹볼라',
    '제나 오르테가', '엠마 마이어스', '크리스티나 리치', '퍼시 하인스 화이트', '헌터 두핸', '캐서린 지타존스', '그웬돌린 크리스트', '루이스 구스만',
    '케빈 스페이시', '로빈 라이트', '케이트 마라', '레이첼 브로즈너핸', '마이클 켈리', '몰리 파커', '코리 스톨', '도미니크 매캘리것',
    '세라 샤히', '애덤 데모스', '마이크 보걸', '윌리스 데이', '리 준 리', '마가렛 오데트', '조너선 사도스키', '다리우스 호마윤',
    '게이브리얼 막트', '패트릭 J. 애덤스', '사라 라퍼티', '서식스 공작부인 매건', '릭 호프먼', '지나 토러스',
    '앤디 샘버그', '앤드리 브라우어', '멜리사 푸메로', '스테퍼니 비어트리즈', '첼시 퍼레티', '테리 크루스', '조 로 트루글리오', '조엘 맥키넌 밀러',
    '에밀리 러드', '이냐키 고도이', '마켄유', '태즈 스카일러', '모건 데이비스', '제프 워드', '피터 개디오', '제이컵 로메로',
    '줄리아 가너', '애나 클럼스키', '러번 콕스', '알렉시스 플로이드', '케이티 로스', '사메르 우스마니', '아리안 모아이드', '케이트 버튼',
    '다시 카든', '테드 댄슨', '윌리엄 잭슨 하퍼', '매니 저신토', '크리스틴 벨', '자밀라 자밀', '마크 에번 잭슨', '애덤 스콧',
    '알렉시스 블레델', '로런 그레이엄', '마일로 벤티밀리아', '재러드 파달레키', '채드 마이클 머리', '멀리사 매카시', '맷 주크리', '스콧 패터슨',
    '이언 서머홀더', '니나 도브레브', '폴 웨슬리', '캔디스 아콜라', '캣 그레이엄', '잭 로리그', '마이클 트레비노', '매슈 데이비스',
    '프레디 하이모어', '리처드 시프', '힐 하퍼', '보 개릿', '탬린 토미타', '니컬러스 곤잘러스', '앤토니아 토머스', '추쿠 모두',
    '와그너 모라', '페드로 파스칼', '보이드 홀브룩', '디에고 루나', '폴리나 게이탠', '알베르토 암만', '호세 마리아 야즈픽', '조안나 크리스티',
    '레게 장 페이지', '피비 디네버', '조너선 베일리', '시몬 애슐리', '니컬로 코클런', '클로디아 제시', '루크 뉴턴', '인디아 아마테이피오',
    '앤터니아 젠트리', '브리안 호웨이', '필릭스 맬라드', '세라 와이스글래스', '케이티 더글라스', '레이먼드 애블랙', '니키 로멜', '스콧 퍼터',
    '앨리 윙', '스티븐 연', '데이비드 최', 'Young Mazino', '애슐리 박', 'Joseph Lee', '앤드류 산티노', '미아 세라피노',
    '일라이자 테일러', '보비 몰리', '마리 아브게로폴로스', '린지 모건', '리처드 하먼', '타샤 텔레스', '헨리 이언 큐직', '페이그 터코',
    '테일러 실링', '로라 프리폰', '우조 아두바', '대니엘 브룩스', '너태샤 리온', '케이트 멀그루', '타린 매닝', '사미라 와일리',
    '밥 오든커크', '레이 시혼', '조너선 뱅크스', '마이클 맨도', '패트릭 페이비언', '진카를로 에스포지토', '토니 돌턴', '마이클 맥킨',
    '딜런 미넷', '알리샤 부', '캐서린 랭퍼드', '브랜던 플린', '크리스티언 나바로', '저스틴 프렌티스', '로스 버틀러', '마일즈 헤이저',
    '안나 캐스카트', '이상헌', '김지아', '최민영', '피터 선월드', '안소니 키이반', '조셀린 쉘포', '김윤진',
    '밀리 보비 브라운', '노아 슈냅', '핀 울프하드', '케일럽 매클로플린', '세이디 싱크', '게이튼 매터래조', '조 키어리', '데이비드 하버',
    '송강', '고민시', '이도현', '고윤정', '이시영', '이진욱', '박유영', '진영',
    '우도환', '이상이', '박성웅', '시원', '정다은', '류수영', '허준호',
    '리처드 매든', '킬리 호이스', '소피 런들', '제드 머큐리오', '지나 맥키', '폴 레디',
    '정호연', '이정재', '위하준', '이유미', '아누팜 트리파티', '박해수', '이병헌',
    '무리카미 니지로', '츠치야 타오', '야마자키 겐토', '아사히나 아야', '미사키 아야메', '미요시 아야카', '츠네마츠 유리', '사쿠라다 도리',
    '메흐메트 구르툴루스', '알바 가이아 벨루지', '크반치 타틀르투', '폴린 에티엔', '레기나 비키니나', '로랑 카펠루토', '스테파노 카세티',
    '얀 비보엣', '오마르 시', 'Shirine Boutella', '뤼디빈 사니에', '루드밀라 마코우스키', '에탄 사이먼', '클로틸드 엠', '수피안 게라브',
    '마마두 하이다라', '이준기', '문채원', '김지훈', '장희진', '최영준', '김수오', '김예원', '황정민', '하정우', '박해수', '유연석', '조우진',
    '장첸', '아누팜 트리파티', '박희순', '정우', '윤진서', '신은수', '박지연', '문진승', '김신비', '김신록',
    '강해림', '김영광', '김용지', '이은우', '김수연', '배강히', '이기찬'
                                              '와그너 모라', '페드로 파스칼', '보이드 홀브룩', '디에고 루나', '폴리나 게이탠', '알베르토 암만',
    '호세 마리아 야즈픽', '조안나 크리스트',
    '김동희', '박주현', '남윤수', '정다빈', '최민수', '김여진', '신명성', '임기홍',
    '박신혜', '조승우', '채종협', '이시우', '정혜인', '김병철', '임지섭', '태인호',
    '알바로 모르테', '우르술라 코르베로', '페드로 알론소', '이치아르 이투뇨', '미겔 에란', '알바 플로레스', '제이미 로렌테', '에스테르 아세보',
    '한소희', '안보현', '박희순', '장률', '문상민', '이학주', '윤경호', '김상호',
    '현빈', '박신혜', '이재욱', '이시원', '박훈', '찬열', '한보름', '민진웅',
    '강하늘', '이유영', '강영석', '한보름', '허성태', '판빙빙', '김상호', '최대훈',
    '서은수', '박성웅', '김성오', '이상희', '방주환',
    '히마베 미나미', '모리카와 아오이', '후쿠하라 하루카', '이케다 엘라이자', '마츠무라 사유리', '타카스기 마히로', '에나코', '마츠다 루카',
    '퉁야오', '장수잉', '마오샤오퉁', '리쩌펑', '장웨', '양러', '에드워드 마', '고호이닝',
    '무라카미 니지로', '츠치야 타오', '야마자키 겐토', '아사히나 아야', '미사키 아야메', '미요시 아야카', '츠네마츠 유리', '사쿠라다 도리',
    '아라가키 유이', '호시노 겐', '료헤이 오타니', '후지이 다카시', '마노 레이나', '이시다 유리코', '니리타 료', '우치다 리오',
    '쉬멍제', '진철원', 'Fan Zhixin', 'Wang Zexuan', '리우 지 웨이',
    '쉬광한', ' 커자옌', '시백우', '안효섭', '황홍성', '사이먼 리안',
    '정솽', '양양', '백우', '마오샤오퉁', '장빈빈', '장혁',
    '왕허디', '심월', '대런 첸', '우시짜', '량징칸', 'Nicky Li', '손이함', '왕 지 진',
    '모리타 미사토', '츠네마츠 유리', '야마다 타카유키', '토미테 아미', '마스다 유카', '시나토 루리', '니시우치 마리야', '카와카미 나나미',
    '송위룡', '빅토리아', '웨이저밍', '위슈신', '왕야오칭', '장우검', '양즈잉', '쩡리',
    '백경정', '전희미',
    '세이노 나나', '샤카구치 켄타로', '타카스기 미히로', '쿠라시나 카나', '코바야시 료코', '후카가와 마이', '카사하라 히데유키', '마에노 토모야',
    '왕 허디', '위슈신', '장릉혁', '임백예', '이일동', '서해교',
    'Wataru lchinose', '테라모토 리오', '쿠츠나 시오리', 'So Kaku', '피에르 타키', '요시에 카즈야',
    '딩위시', '짜오루스', 'Zhou Zixin', '성잉하오', 'Quan Peilun', 'Zhao Xin', '첸 밍하오', '오일가',
    '고바야시 가오루', '후와 만사쿠', '오다기리 조', '아야타 토시키', '안도 타마에', 'Shohei Uno',
    '친한', '왕 허디', '이종한', '판훙',
    '치차 아마따야꾼', 'Pajaree Nantarat', '찬야 맥클로리', 'Thanvate Siriwattanagul', '클라우디아 차크라반드 나 아유타야', '리치팅', '칸차넛 켄트라',
    '자오진마이', '라이관린', '왕보원', '리 시 멩', '왕이미아오', '시을',
    '쉬카이', '성소', '저우이란', '자이샤오윈', 'Gao Han', 'Yao Chi', '미열', '레이첼 왕',
    '미치에다 슌스케', '후쿠모토 리코', '스즈키 진', '메구로 렌', '니시가키 쇼', '모치즈키 아유무', '시라스 진',
    '진옥기', '쩡순시', '축사단', '주해미', '허아정', '임신', 'Chen Xinyu', '조희월',
    '진구', '서은수', '윤박', '장유상', '채정안', '김호정',
    '안이쉬안', '우젠하오', '오강인', 'Xiao Xiao Bin', '허위녕', '아만다 추', '쩡사오쭝', '유서기',
    '김우빈', '강유석', '이솜', '송승헌', '노윤서', '이이담', '이성경', '장미관',
    '헨리 카빌', '프레이아 앨런', '애니아 찰로트라', '조디 메이', '비외르든 홀리뉘르 하랄손', '애덤 레비', '미안나 버림', '미미 은디웨니',
    '김날길', '서현', '유재명', '이현욱', '이호정',
    '메리 엘리자베스 윈스테드', '매들린 나이트', '토퍼 그레이스', '트로이 베이커', '맥켄지 데이비스', '에밀리 오브라이언', '조쉬 브레너', '다이스케 쓰지',
    '송중기', '김지원', '장동건', '김옥빈', '카라타 에리카', '기도훈', '이준기', '유태오',
    '메들린 클라인', '체이스 스토크스', '루디 팬코', '매디슨 베일리', '드류 스타키', '조나단 데이비스', '찰스 에스튼', '오스틴 노스',
    '크리스 에반스', '송강호', '틸다 스윈튼', '애드 해리스', '존 허트', '제이미 벨', '옥타비아 스펜서', '루크 파스퀄리노',
    '양양', 'Lai Yumeng', 'Daisy Li', '장수잉', '가오한위', '라이이', '범진위', 'Long Jiang',
    '에즈라 밀러', '마이클 키턴', '벤 애플렉', '사샤 카예', '키어지 클레먼스', '마리벨 베르두', '마이클 섀넌', '이안 로',
    '이승기', '수지', '신성록', '문정희', '백윤식', '박아인', '문성근', '유태오',
    '우레이', '루유녕',
    '샘 휴언', '커트리나 밸프', '리차드 랜킨', '소피 스켈톤', '토비어스 멘지스', '로런 라일', '존 벨', '던컨 라크로익스',
    '이청아', '남궁민', '김성현', '윤선우', '이신영', '안시하', '윤경호', '김원해',
    '캐머런 디애즈', '주드 로', '케이트 윈슬렛', '잭 블랙', '일라이 윌릭', '루퍼스 슈얼', '엠마 프리차드', '미피 잉글필드',
    '휴 그랜트', '엠마 톰슨', '콜린 퍼스', '리암 니슨', '키이라 나이틀리', '토머스 브로디생스터', '앨런 릭먼', '빌 나이',
    '엠마 로버츠', '루크 브레이시', '크리스틴 체노웨스', '니컬라 펠츠', '제시카 캡쇼', '프랜시스 피셔', '에이미 카레로', '제이크 맨리',
    '린제이 로한', '코드 오버스트리트', '앨리 로언', '조지 영', '잭 와그너', '카멜리아 소머스', '마이클 데미언', '케이트 라체스크',
    '커트 러셀', '다비 캠프', '골디 혼', '주다 루이스', '킴벌리 윌리엄스페이즐리', '올리버 허드슨', '라몬 모리스', '마틴 로치',
    '니나 도브레브', '지미 O. 양', '대런 바넷', '해리 셤 주니어', '미카엘라 후버', '리베카 스타브', '헤더 맥마한', '제임스 사이토',
    '버네사 허진스', '닉 사가르', '샘 팔라디오', '알렉사 아데오순', '수앤 브라운', 'Mark Fleischmann', '로빈 소안스', '안드리아 몰도비아누',
    '헤더 그레이엄', '브랜드 노우드', '제이슨 비그스', '멧 세데뇨', '체이스 램지', '와이어트 헌트',
    '번 램', '로즈 매카이버', '아너 니프시', '앨리스 크리거', '다니엘의 아버지', '테오 드바니', '리처드 애쉬터', '세라 더글러스',
    '팀 앨런', '제이미 리 커티스', '댄 애크로이드', '줄리 곤살로', 'M. 에멧 윌시', '에릭 퍼 설리번', '제이크 부시', '치치 매린',
    '로라 마라노', '그레그 설킨', '이사벨라 고메스', '카산드라 나우드', '토마스 로', '매디 필립스', '릴리언 다우쳇 로체', '마이클 에반스 벨링',
    '줄리안 데니슨', '다비 캠프', '골디 혼', '커트 러셀', '서니 설직', '주다 루이스', '타이리스 깁슨', '달린 러브',
    '유태오', '이연희', '유인나', '수영', '천두링', '염혜란', '이동휘', '시원',
    '미도리 프랜시스', '오스틴 에이브럼스', '키아나 마리', '닉 조너스', '글렌 매큐언', '트로이 이와타', '단테 브라운',
    '저스틴 하틀리', '배럿 도스', '보니 베델리아', '제임스 리마', '에센스 앳킨스', '아론 코스타 게니스', '제프 코벳', '모니카 맥카시',
    '미셸 파이퍼', '잭 에프론', 'Robert De Niro', '힐러리 스왱크', '조시 더멜', '캐서린 하이글', '아비게일 브레스린', '제시카 비엘',
    '라이언 레이놀즈', '애나 패리스', '에이미 스마트', '크리스 클라인', '크리스 마퀘트', '줄리 해거티', '프레드 이와누익', '스티븐 루트',
    '브룩 실즈', '케리 엘위스', '드루 배리모어', '리 로스', '앤디 오쇼', '바네사 그레이즈', '에일리 로안', 'Mark Flesichmann',
    '캐서린 한', '밀라 쿠니스', '크리스틴 벨', '수잔 서랜든', '저스틴 하트린', '크리스틴 배런스키', '셰릴 하인스', '크리스티나 애플게이트',
    '데이비드 하버', '비벌리 댄절로', '알렉스 하셀', '존 레귀자모', '캠 지간데이', '알렉시스 라우더', '미트라 수리',
    '필라 폴리아티', '니콜라스 마우파스', '글렌 블락할', '마르코 로세티', '체칠리아 베르토치',
    '이다 엘리세 브로크', '펠릭스 산드만', '가브레일', '매즈 소요가드 피터센', '오드예이르 투네', '데니스 스토헤이', '아르투르 하칼라티', '리네 베른달',
    '이사벨라 메르세드', '키어넌 십카', '리브 휴슨', '오데야 러시', '샤메익 무어', '미첼 호프', '조앤 쿠삭', '마일즈 로빈스',
    '팀 앨런', '빈센트 도노프리오', '루크 그라임스', '커트우드 스미스', '제시카 알바', '댁스 셰퍼드', '미셸 밀렛트', '킴벌리 퀸',
    'Henry Lawfull', '매기 스미스', '조 마가렛 콜레티', '샐리 호킨스', '크리스틴 위그', '미힐 하위스만', '조엘 프라이', '스티븐 머천트',
    '조시 화이트하우스', '버네사 허진스', '이매뉴엘 슈리키', '캣 그레이엄', '롭 로', '해리 자비스', '엘라 케니언', 'Isabelle Franca',
    '닉 베이트먼', '질 와그너', '루비 터퍼', '태건 모스', '앤드류 프랜시스', '엑스타샤 샌더스',
    '리처드 매든', '킬리 호이스', '소피 런들', '제드 머큐리오', '지나 맥키', '폴 레디',
    '에이사 버터필드', '애마 매키', '슈티 개트와', '타니아 레이놀스', '코너 스윈델스', '질리언 앤더슨', '미미 킨', '퍼트리샤 앨리슨',
    '제시카 바든', '알렉스 로우더', '나오미 애키', '크리스틴 바텀 리', '제마 웰런', '스티브 오람', '운미 모사쿠', '나빈 초드리',
    '킬리언 머피', '폴 앤더슨', '톰 하디', '헬렌 맥크로리', '소피 런들', '핀 콜', '조 콜', '너태샤 오키프',
    '도미닉 웨스트', '엘리자베스 데비키', '올리비아 윌리엄스', '클라우디아 해리슨',
    '킷 코너', '조 로크', '야스민 피니', '세바스찬 크로프트', '올리비아 콜맨', '제니 발저', '키지 에드겔',
    '이브 휴슨', '시모나 브라운', '톰 베이트먼', '로버트 아라마요', '니컬로 벌리', '타일러 호윗', '에바 버시슬', '조지 글렌',
    '윌 폴터', '핀 화이트헤드', '찰리 브루커', '아심 차우다리', '크레이그 파킨슨', '앨리스 로', '탈룰라 해던', '카트리오나 녹스',
    '시라 하스', '제이콥 포춘 로이드', '카일 소예르', '스티븐 그레이엄', '아마카 오카포', '시노브 칼슨',
    '브라이스 댈러스 하워드', '헤일리 앳웰', '미케일라 코얼', '존 햄', '토비 케블', '앤서니 매키', '제시 플레먼스', '알렉스 로우더',
    '알렉산더 드레이몬', '이얀 하트', '데이비드 도슨',
    '찰리 머피', '리처드 아미티지', '인디라 바마', '리쉬 샤', '소네라 엔젤', '피파 베넷 워너', '매리언 베일리', '프란체스크 나이트',
    '조에 에랑', '진 디슨', '말론 레바나', '소피 카타니', '마티외 드미', '노아 베로',
    '애비게일 카우언', '대니 그리핀', '세이디 소버롤', '프레디 토프', '해나 밴더베스트헤이슨', '엘리샤 애플바움', '제이콥 더드먼', '폴리나 차베스',
    '리처드 아미티지', '셔반 피너런', '제이콥 더드먼', '엘라 래 스미스', '폴 케이',
    '벨라 데인', '루이스 헌터', '데이비드 스렐폴', '데이비드 자시', '렉스 킹', '조너스 암스트론', '톰 웨스턴조스',
    '리키 저베이스', '다이앤 모건', '애슐리 젠슨', '맨딥 딜런', '데이비드 브래들리', '데이비드 얼', '조 윌킨스', '퍼넬리피 윌턴',
    '매튜 매커너히', '앤 해서웨이', '차스테인 마이클 케인',
    '줄리아 브라운', '숀 빈', '헬렌 헌트', '조나 하워킹', '레슬리 맨빌', '조피아 비흐와치', '브라이언 J. 스미스', '이완 미첼',
    '루비 스톡스', '카메론 채프먼', '알리 하지 헤쉬마티', '패디 홀랜드', '루이즈 브릴리', '잭 반데이라',
    '다이앤 모건',
    '시어셔모니카 잭슨', '루이자 할랜드', '제이미 리 오도넬', '니컬라 코클런', '딜런 르웰린', '레아 오루크',
    '제나 콜먼', '타하르 라힘', '엘리 뱀버', '빌리 하울', '마릴드 와르니에', '일케르 칼렐리',
    '소피 와일드', '니브 매코맥', '제시 메이 알론조', '해리 캐드비', '로린 아주포', '샘 루벤', '알렉스 하셀', '비비안 아체암풍',
    '케빈 코스트너', '라이언 레이놀즈', '토미 리 존스', '게리 올드먼', '갈 가토트', '엘리스 이브',
    '마이클 C. 홀', '어맨다 애빙턴', '오드레 플뢰로', '해나 아터턴', '마크 위런', '에밋 J. 스캔런', '나이젤 린제이',
    '덴절 워싱턴', '클라이브 오언', '조디 포스터', '추이텔 에지오포', '크리스토퍼 플러머', '킴 디렉터', '버니 레이첼',
    '애슐리 월터스', '마이클 워드', '자스민 잡스', '카노', '새프론 호킬', '리틀 심즈', '말콤 카물레테',
    '에밀리앙 베케만스', '카렌 코넬',
    '박경림', '기욤', '하석진', '궤도', '서동주', '이시원', '조연우', '곽준빈', '이혜성', '서유민', '승관', '김동재',
    '데프콘', '송혜나', '이이경', '전효성',
    '최영재', '김동현', '김성주', '츄', '윤두준', '장동민', '안유진', '김희철',
    '강호동', '이상민', '서장훈', '김영철', '이수근', '김희철', '민경훈', '이진호',
    '박미선', '인교진', '하하', '서장훈',
    '박용택', '정근우', '이대호', '이승엽', '유희관', '이택근',
    '김지은', '이수현', '정세운', '규현', '임정윤',
    '빠니보틀', '곽튜브', '주현영', '노홍철', '주우재',
    '이혜영', '이지혜', '정겨운', '유세윤',
    '곽정은', '한혜진', '주우재', '김숙', '서장훈', '최화정', '고은아',
    '데프콘', '조현아', '박경리', '김가영',
    '혜리', '리정', '파트리샤 욤비', '조미연', '최예나', '김채원',
    '오은영', '장영란', '신애라', '홍현희', '정현돈',
    '허영지', '장도연', '코드 쿤스트', '양세찬', '허영지',
    '이시영', '노홍철', '덱스', '박나래', '딘딘', '츠키', '유희관', '조나단', '파트리샤', '꽈추형',
    '송은이', '이이경', '권일용', '안정환',
    '서장훈', '이수근',
    '유재석', '이광수', '김연경',
    '안정환', '이동국', '모태범', '김용만', '김성주', '김동현', '허재',
    '김현아', '김혜리', '이수련', '김봉은', '김희정', '김경애',
    '이덕화', '이경규', '이태곤', '장도연', '김준현', '지상렬',
    '유재석', '안재욱', '김종민', '이광수', '박민영', '세훈', '김세정',
    '번즈 유키', '미즈키 시다', '유키 이다치', '토쿠이 요시미', '마코토 하세가와',
    '벡키', '타무라', '아츠시',
    '크리쉘 스타우스', '크리스틴 퀸', '제이슨 앤오펜하임', '메리 피츠제럴드', '브리아나 티시',
    '고든 램지',
    '신민규', '이주미', '한겨례', '김지영', '유지원',
    '신동엽', '성시경', '오구라 유나', '하마사키 마오',
    '황인엽', '문가영', '차은우', '박유나', '임세미', '강민아', '김민기',
    '옹성우', '김향기', '신승호', '문빈', '김도완', '강기영',
    '왕허디', '심월', '대런 첸', '우시쩌',
    '이은샘', '예리', '유정후', '한닥솔', '장덕수', '장성윤', '박시우',
    '황인엽', '지창욱', '최성은', '남다름', '지혜원', '김보윤', '류경수', '홍서희',
    '장흠이', '량징캉', '장뤄난', '자이쯔루',
    '리셴', '양쯔', '호일천', '위청언', '리밍더', '왕진아',
    '서에지', '김수현', '박규영', '오정세', '김주헌', '곽동연', '박진주', '장규리',
    '이민호', '전지현', '신혜선', '신원호', '이희준', '박진영', '신은수', '김우빈',
    '송승헌', '강유석', '이솜', '공유', '김고은', '이동욱', '유인나', '육성재', '김소현',
    '김민재', '이재욱', '고윤정', '정소민', '황민현', '유인수', '신승호', '이채민', '조병규',
    '김세정', '유준상', '강기영', '김히어라', '유인수', '엄혜란', '박보영', '서인국', '이수혁',
    '강태오', '신도현', '다원', '이지은', '여진구', '조현철', '박유나', '신정근', '배해선', '야마자키 켄토',
    '츠치야 타오', '무라카미 니지로', '모리나가 유키', '마치다 케이타', '미요시 아야카', '폴린 에티엔', '로랑 카펠루토',
    '메흐메트 쿠르툴루슈', '바베티다 사조', '얀 베이풋', '크사베리 슐렌', '루나 블레이즈', '조시 댈러스', '아데나 카카니스',
    '파르빈 카우르', '맷 롱', '잭 메시나', '제나 오르테가', '그웬돌린 크리스티', '리키 린드홈', '크리스티나 리치', '제이미 맥쉐인',
    '헌터 두핸', '우서흔', '왕학체', '장릉혁', '폴 웨슬리', '이안 소머헐더', '캣 그레이엄', '캔디스 아콜라', '잭 로어리그', '매튜 데이비스',
    '조승우', '박신혜', '김병철', '성동일', '태인호', '채종협', '이민호', '김고은', '우도환', '김경남', '정은채', '이동욱', '김소연', '김범', '류경수',
    '황희', '김용지', '이냐키 고도이', '에밀리 러드', '맛켄유', '제이컵 로메로 깁슨', '태즈 스카일러', '빈센트 레건', '헨리 카빌', '애니아 철로트라',
    '프레이아 앨런', '현빈', '박훈', '김용림', '찬열', '이레', '자크 타일러', '메이 휘트먼', '잭 디세나', '양양', '조로사', '선로', '뢰예',
    '엘리자 테일러 코터', '바비 몰리', '마리 아브게로폴로스', '린지 모건', '리처드 하몬', '김희선', '로운', '이수혁', '김해숙', '윤지온',
    '문서윤', '가가연', '허광한', '시백우', '안육린', '장동건', '이준기', '신세경', '김옥빈', '이준기', '박해준', '배두나', '공유', '이준',
    '김선영', '이무생', '이성욱', '위노나 라이더', '데이빗 하버', '매튜 모딘', '핀 울프하드', '밀리 바비 브라운', '게이튼 마타라조', '박보영',
    '안효섭', '이성재', '이시언', '한소희', '권수현', '여진구', '방민아', '홍종현', '최성원', '홍서영', '차정원', '양미', '자오유팅', '장즈야오',
    '렌이밍', '디리러바', '송강', '이진욱', '이시영', '고민시', '박규영', '진영', '이도현', '시마자키 노부나가', '히라노 아야', '하나자와 카나',
    '이시영', '노홍철', '박나래', '딘딘', '츠키', '유희관', '이동욱', '김소연', '김범', '류경수', '황희', '김용지', '우메다 슈이치로', '쿠스노키 토모리',
    '후루카와 마코토', '하나에 나츠키', '아마미야 소라', '하나자와 카나', '조 맹거넬로', '로자리오 도슨', '세스 그린', '유재명', '한예리', '엄태구', '김새벽',
    '최광일', '이레', '에반 피터스', '리처드 젱킨스', '니시 내시-베츠', '몰리 링월드', '마이클 러니드', '매튜 다드다리오', '캐서린 맥나마라', '이사야 무스타파',
    '알베르토 로센데', '도미닉 셔우드', '해리 슘 주니어', '주지훈', '배두나', '류승룡', '김상호', '허준호', '김성규', '박지후', '윤찬영', '조이현', '로몬', '유인수',
    '이유미', '김병철', '스기야마 리호', '카시오 다이스케', '스에가라 리에', '하나모리 유미리', '미츠야 유지', '시모노 히로', '칼라 구지노', '브루스 그린우드', '메리 맥도넬',
    '칼 럼블리', '마크 해밀', '제이미 킹', '저스틴 추 케리', '크리스틴 리', '살 벨레스 주니어', '켈시 플라워', '조이 말릿', '엘라 발린스카', '태머라 스마트',
    '시에나 아구동', '애들라인 루돌프', '랜스 레드딕', '파올라 누녜스', '유아인', '김현주', '박정민', '원진아', '양익준', '김도윤', '전지현', '박병은', '김시아',
    '김뢰하', '구교환', '미힐 하위스만', '칼라 구지노', '티머시 허턴', '헨리 토머스', '엘리자베스 리저', '올리버잭슨코언', '케이트 시걸', '빅토리아 퍼드레티',
    '룰루 윌슨', '러셀 호지킨슨', '켈리타 스미스', '케이스 알란', 'DJ 퀄스', '넷 장', '알리사 서더랜드', '이시아 위트락 주니어', '빌카', '거스 버니', '루크 코스그로브',
    '그렉 호바네시안', '팀 블레이크 넬슨', '세바스찬 로쉘', '엘피디아 카리요', '디미트리어스 그로스', '데이빗 휴렛', 'F. 머리 에이브러햄', '글린 터먼', '키어넌 십카',
    '로스 린치', '미란다 오토', '루시 데이비스', '챈스 퍼도모', '미셸 로메즈', '재즈 싱클레어', '치스가 하루카', '오카모토 노부히코', '사쿠라이 타카히로', '후지와라 나츠미',
    '이세 마리야', '오츠카 호추', '엘라 발린스카', '태머라 스마트', '시에나 아구동', '애들라인 루돌프', '랜스 레드딕', '파올라 누녜스', '설아', '이현주', '송채윤', '한가림',
    '심소영', '리처드 아미티지', '제임스 캘리스', '알레한드라 레이노소', '제시카 브라운 핀들리', '후쿠시마 리라', '제이슨 아이작스', '닐 블롬캠프', '연우진', '장동윤', '이정은',
    '수지', '얀세종', '하영', '박세완', '김도완', '김민호', '성동일', '이일화', '라미란', '김성균', '최무성', '김선영', '류준열', '혜리', '류혜영', '전여빈', '강훈',
    '박혁권',
    '남지현', '최현욱', '김무열', '정다빈', '서범준', '채서은', '유연석', '문가영', '금새록', '정가람', '문태유', '정재성', '김우빈', '정수정', '김지원', '강민혁',
    '김동준',
    '최수종', '지승현', '이원종', '김산호', '김정학', '박은빈', '김효진', '채종협', '차학연', '김주헌', '배강희', '박해진', '박성웅', '임지연', '김유미', '신정근',
    '김권',
    '송중기', '전여빈', '옥백연', '유재명', '김여진', '곽동연', '손예진', '정해인', '장소연', '정유진', '주민경', '이주영', '박서준', '김다미', '유재명', '권나라',
    '김동희',
    '안보현', '김혜수', '김무열', '이성민', '이정은', '이보영', '손나은', '조성하', '한준우', '전혜진', '이창훈', '강태오', '강기영', '전배수', '백지원', '진경',
    '정해인',
    '구교환', '김성균', '손석구', '지진희', '김지현', '이선균', '이지은', '고두심', '박호산', '송새벽', '이지아', '염정아', '정준호', '이태란', '최원영', '윤세아',
    '김병철', '조승우', '배두나', '최무성', '김영재', '이준혁', '박성근', '이병헌', '김태리', '유연석', '변요한', '김민정', '김갑수', '김희애', '박해준', '한소희',
    '박선영', '김영민', '채국희', '김태리', '남주혁', '김지연', '최현욱', '이주명', '서재희', '김동희', '정다빈', '박주현', '남윤수', '최민수', '김여진', '문가영',
    '차은우', '황인엽', '박유나', '임세미', '박호산', '지창욱', '최성은', '황인엽', '지혜원', '김보윤', '오소현', '서현진', '라미란', '하준', '이창훈', '태인호',
    '이향나', '서현진', '이민기', '이다희', '안재현', '이태리', '문지인'
]

ACTOR_DATA = set(ACTOR_DATA)
print(ACTOR_DATA)


# C: 데이터 생성 (INSERT)
def insert():
    try:
        for actor in ACTOR_DATA:
            insert_query = "INSERT INTO profile (profile_img_url, user_id, nickname) values (%s, %s, %s)"
            cursor.execute(insert_query, actor)
        conn.commit()
        cursor.execute('select * from video_genre')
        for row in cursor.fetchall():
            print(row)

    except Exception as e:
        print(f"데이터 생성 중 오류 발생: {e}")
        conn.rollback()


def read():
    # R: 데이터 읽기 (SELECT)
    try:
        select_query = "select * from video_actor"
        cursor.execute(select_query)
        for row in cursor.fetchall():
            print(row)
    except Exception as e:
        print(f"데이터 읽기 중 오류 발생: {e}")


def update():
    # U: 데이터 업데이트 (UPDATE)
    try:
        update_query = "UPDATE your_table SET column1 = %s WHERE column2 = %s"
        cursor.execute(update_query, ('new_value', 'some_value'))
        conn.commit()
    except Exception as e:
        print(f"데이터 업데이트 중 오류 발생: {e}")
        conn.rollback()


def delete():
    # D: 데이터 삭제 (DELETE)
    try:
        delete_query = "DELETE FROM video_genre"
        cursor.execute(delete_query)
        conn.commit()
    except Exception as e:
        print(f"데이터 삭제 중 오류 발생: {e}")
        conn.rollback()

read()
# 작업 완료 후 커서와 연결 종료
cursor.close()
conn.close()

