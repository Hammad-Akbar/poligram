import os
import flask
import flask_socketio
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('send message')
def send_message(text):
    response = requests.get(f'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{text}?key={API_KEY}')
    result = response.json()
    messageReceived = ''
    try:
        definition = result[0]['shortdef']
        messageReceived = ', '.join(definition)
    except:
        messageReceived = "Sorry, we can't find the definition of the term you are looking for."

    socketio.emit('forward message', messageReceived)

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )