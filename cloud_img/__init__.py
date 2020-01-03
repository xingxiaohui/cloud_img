from flask import Flask

# 初始化 Flask 框架
app = Flask(__name__)
# 读取配置信息
app.config.from_pyfile('app.conf')
# 增加 jinja 语法拓展
app.jinja_env.add_extension('jinja2.ext.loopcontrols')
# 初始化 Flash-Massage 使用的密钥
app.secret_key = 'moe-moe-2019-12-22-15-38-06-v-0-0-1'

from cloud_img import models, views