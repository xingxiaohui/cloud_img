import os
import uuid

from flask import render_template, json, request
from werkzeug.utils import secure_filename

from cloud_img import app

# 设置允许的文件格式
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'JPG', 'PNG', 'bmp'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload/', methods={'post'})
def upload():
    f = request.files['file']
    if not (f and allowed_file(f.filename)):
        return json.dumps({"code": 500, "msg": '文件格式有误！'})
    # 当前文件所在路径
    base_path = os.path.dirname(__file__)
    # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
    path = uuid.uuid4().hex[0:8] + '.' + f.filename.rsplit('.', 1)[1]
    upload_path = os.path.join(base_path, 'static/image/upload', path)
    f.save(upload_path)
    url = 'http://localhost:5000/static/image/upload/' + path
    return json.dumps({"code": 200,
                       "msg": '上传成功！',
                       "url": url})
