import os
import flask
import flask_socketio
import flask_sqlalchemy
import requests
import dotenv


dotenv.load_dotenv()

DICTIONARY_API_KEY = os.getenv('DICT_API_KEY')
news_api_key = os.getenv('NEWS_API_KEY')

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
    
    
   
def news_api_call(data):
	print("Got an event for newz:", data)
	url = 'https://newsapi.org/v2/everything?'
	parameters = {
	    'q': 'politics', # query phrase
	    'pageSize': 5,  # maximum is 100
	    'apiKey': news_api_key
	}

	response = requests.get(url, params=parameters)
	response_json = response.json()
	news_list = response_json["articles"]
	
	print(news_list, "response");
	print("\n\n")
	
	socketio.emit('newsData', {
     	'news_data' : news_list
     })
     
	Title = []
	Author = []
	content = []
	source = []
	link = []
	imglink = []

	for i in news_list:
	    Title.append(i["title"])
	    print("Title : ", i["title"])
	    print("Author: ", i["author"])
	    Author.append(i["author"])
	    print("Content: ", i["content"])
	    content.append(i["content"])
	    print("Published At: ", i["publishedAt"])
	    print("sources: ", i["source"]["name"])
	    source.append(i["source"]["name"])
	    print("Original Link: ", i["url"])
	    link.append(i["url"])
	    print("Original Link: ", i["urlToImage"])
	    imglink.append(i["urlToImage"])
	    print("\n\n")

# 	socketio.emit('newsData', {
#      	'img': imglink,
#      	'link': link,
#     	'source': source,
#      	'content': content,
#      	'author': Author,
#      	'title': Title
#      })

news_api_call("news")
if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
