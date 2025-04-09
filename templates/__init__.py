from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['Secret_Key'] = 'secret_final-year'

    return app