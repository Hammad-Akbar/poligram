import os
import flask
import flask_socketio
import flask_sqlalchemy
import requests
import dotenv


dotenv.load_dotenv()

DICTIONARY_API_KEY = os.getenv('DICT_API_KEY')

FEEDBACK_TOKEN = os.getenv('FEEDBACK_API_TOKEN')
FEEDBACK_VERIFY = os.getenv('FEEDBACK_API_VERIFY')

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

DATABASE_URI = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI

db = flask_sqlalchemy.SQLAlchemy()
db.init_app(app)
db.app = app

FEEDBACK_FORM = "https://app.traggr.com/embed/v1/feedbackform?token={}&verification={}&bg=%23ffffff&bbg=%2305b1eb&bc=%23ffffff&source=5".format(FEEDBACK_TOKEN,FEEDBACK_VERIFY)

@app.route('/')
def hello():
    return flask.render_template('index.html')
    
@socketio.on('new feedback')
def create_feedback_form():
	socketio.emit('feedback created', FEEDBACK_FORM)
	
@socketio.on('send message')
def send_message(text):
    response = requests.get(
        f'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{text}?key={DICTIONARY_API_KEY}')
    result = response.json()

    messageReceived = ''
    if 'shortdef' in result[0]:
        definition = result[0]['shortdef']
        messageReceived = ', '.join(definition)
    else:
        messageReceived = "Sorry, we can't find the definition of the term you are looking for."

    socketio.emit('forward message', messageReceived)

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
