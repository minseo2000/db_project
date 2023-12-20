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
    (28, 26), (17, 26), (14, 28), (27, 28), (17, 28), (20, 29), (17, 29),
    (20, 30), (17, 30),
    (27, 31), (24, 31), (17, 31), (14, 31),
    (13, 32), (13, 33), (13, 34), (13, 35),
    (13, 36), (13, 37), (13, 38), (13, 39), (13, 40), (13, 41),
    (13, 42), (13, 43), (13, 44), (13, 45), (13, 46), (13, 47), (13, 48), (13, 49), (13, 50),
    (13, 51), (13, 52), (13, 53), (13, 54), (13, 55), (13, 56), (13, 57), (13, 58), (13, 59), (13, 60),
    (27, 61), (14, 61),
    (27, 62), (15, 62), (14, 62), (12, 62),
    (25, 63), (15, 63), (12, 63),
    (17, 64), (28, 64),
    (28, 65), (19, 65),
    (28, 66), (23, 66),
    (28, 67), (12, 67),
    (28, 68),
    (28, 69), (19, 69),
]





# C: 데이터 생성 (INSERT)
def insert():
    try:
        for actor_relation in ACTOR_RELATION_DATA:
            insert_query = "INSERT INTO video_genre_relation (video_genre_id, video_id) values (%s, %s)"
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

