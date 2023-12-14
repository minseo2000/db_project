# FTP 서버를 통해 파일을 전송하기 위한 파이썬 스크립트

import ftplib

def ftp_upload(ftp, filepath, dest_filename):
    """
    FTP 서버에 파일을 업로드합니다.
    ftp: 연결된 FTP 객체
    filepath: 업로드할 파일의 경로
    dest_filename: 서버에 저장될 파일 이름
    """
    with open(filepath, 'rb') as file:
        ftp.storbinary('STOR ' + dest_filename, file)
        print(f"'{filepath}' 파일이 '{dest_filename}' 이름으로 업로드되었습니다.")
def ftp_download(ftp, filename, dest_filepath):
    """
    FTP 서버에서 파일을 다운로드합니다.
    ftp: 연결된 FTP 객체
    filename: 다운로드할 파일 이름
    dest_filepath: 저장될 파일 경로
    """
    with open(dest_filepath, 'wb') as file:
        ftp.retrbinary('RETR ' + filename, file.write)
        print(f"'{filename}' 파일이 '{dest_filepath}' 경로에 다운로드되었습니다.")
def connect_to_ftp(host, username, password):
    """
    FTP 서버에 연결하고 로그인합니다.
    host: FTP 서버 주소
    username: 사용자 이름
    password: 비밀번호
    """
    try:
        # FTP 서버에 연결
        ftp = ftplib.FTP(host)

        # 사용자 이름과 비밀번호로 로그인
        ftp.login(username, password)

        print("FTP 서버에 성공적으로 연결되었습니다.")
        return ftp
    except ftplib.all_errors as e:
        print("FTP 연결 오류:", e)
# FTP 서버 정보
host = "minseotest.iptime.org"
username = "ftp_user"
password = "2019212950"

# FTP 서버에 연결
ftp = connect_to_ftp(host, username, password)

print(ftp.dir())
print(ftp.file)

# 업로드 및 다운로드할 파일 정보
upload_filepath = "./test.txt"   # 로컬 파일 경로
dest_filename = "/test.txt"        # 서버에 저장될 파일 이름

download_filename = "remote_filename"    # 다운로드할 서버의 파일 이름
dest_download_path = "path/to/save/file" # 다운로드 파일 저장 경로

# 파일 업로드
ftp_upload(ftp, upload_filepath, dest_filename)

# 파일 다운로드
#ftp_download(ftp, download_filename, dest_download_path)

# FTP 연결 종료
ftp.quit()
