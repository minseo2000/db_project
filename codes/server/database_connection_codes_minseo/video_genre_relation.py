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
    (22 ,272), (21 , 297), (18 ,132) , ( 26, 186 )
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

