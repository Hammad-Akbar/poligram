import os
import flask
import flask_socketio
import flask_sqlalchemy
import requests
import dotenv


dotenv.load_dotenv()

DICTIONARY_API_KEY = os.getenv('DICT_API_KEY')
NEWS_API_KEY = os.getenv('NEWS_API_KEY')

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
    

@socketio.on('news api call')
def news_api_call():
	print("Got an event for newz:")
	url = 'https://newsapi.org/v2/everything?'
	parameters = {
	    'q': 'politics', # query phrase
	    'pageSize': 15,# maximum is 100
	    'apiKey': NEWS_API_KEY
	}

	response = requests.get(url, params=parameters)
	response_json = response.json()
	news_list = response_json["articles"]
	
	#print(news_list, "response");
	
	newsObjectLst = []

	for i in news_list:
		news_content = i["content"].split("…")
		final_news_content = str(news_content[0]) + "(continue reading)... "
		newsObjectLst.append(
			{
			'title': i["title"], 
			'author': i["author"], 
			'content': final_news_content, 
			'published': i["publishedAt"], 
			'source': i["source"]["name"], 
			'url': i["url"], 
			'img': i["urlToImage"]
			}
		)


	print(newsObjectLst)

	socketio.emit('newsData', {
		'newsObjectLst': newsObjectLst
	})


if __name__ == '__main__':
	socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )