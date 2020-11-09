import os
import flask
import flask_socketio
import flask_sqlalchemy
import requests
import dotenv
import json
import random


dotenv.load_dotenv()

DICTIONARY_API_KEY = os.getenv('DICT_API_KEY')

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

DATABASE_URI = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI

db = flask_sqlalchemy.SQLAlchemy()
db.init_app(app)
db.app = app


@app.route('/')
def hello():
    return flask.render_template('index.html')


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


@socketio.on('request quiz')
def request_quiz():
    questions_file = open('quiz_questions.json', 'r')
    questions_json = json.load(questions_file)
    questions_file.close()
    
    groups = questions_json['groups']
    group_indexes = [n for n in range(len(groups))]
    random.shuffle(group_indexes)
    
    quiz_out = []
    
    for i in group_indexes:
        questions = groups[i]['questions']
        q_index = random.randrange(len(questions))
        
        quiz_out.append(questions[q_index])
        
    print(quiz_out)
    
    
if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
