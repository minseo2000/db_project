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


ACTOR_RELATION_DATA =[
    (2725, 16), (1804, 16), (2036, 16), (1535, 16), (2148, 17), (2565, 17), (2760, 17), (1349, 17), (2010, 17),
    (1752, 17), (2084, 17),
    (2580, 18), (1770, 18), (1334, 18), (2666, 18), (2614, 18), (2469, 18), (1829, 18), (1424, 18), (1961, 19),
    (2254, 19), (2296, 19),
    (1340, 20), (1619, 20), (1347, 20), (2103, 20), (2162, 20), (2460, 20), (2429, 21), (1708, 21), (2750, 21),
    (2030, 21), (1317, 21), (1615, 21), (1833, 21),
    (1362, 21), (1542, 22), (1590, 22), (2137, 22), (1752, 22), (2674, 22), (1623, 22), (2590, 22), (1562, 22),
    (1623, 23), (2332, 23),
    (1739, 23), (1446, 23), (2335, 23), (1951, 23), (2496, 23), (1597, 23), (1623, 25), (2298, 25), (2457, 25),
    (1696, 25), (2742, 25), (1718, 25),


]





# C: 데이터 생성 (INSERT)
def insert():
    try:
        for actor_relation in ACTOR_RELATION_DATA:
            insert_query = "INSERT INTO video_actor_relation (video_actor_id, video_id) values (%s, %s)"
            cursor.execute(insert_query, actor_relation)
        conn.commit()
        cursor.execute('select * from video_actor_relation')
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

insert()

# 작업 완료 후 커서와 연결 종료
cursor.close()
conn.close()

