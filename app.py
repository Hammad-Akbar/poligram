"""app.py Server to validate client request"""
# pylint: disable=C0301
# pylint: disable=C0103
# pylint: disable=E1101
import os
import json
import random
from datetime import date, timedelta
import flask
from flask import request
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
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = flask_sqlalchemy.SQLAlchemy()
db.init_app(app)
db.app = app
import models


def messageDict(text):
    """ API call for dictionary """
    response = requests.get(
        f'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{text}?key={DICTIONARY_API_KEY}')
    result = response.json()
    messageReceived = ''
    if 'shortdef' in result[0]:
        definition = result[0]['shortdef']
        messageReceived = ', '.join(definition)
        messageReceived = messageReceived.capitalize()
    else:
        messageReceived = "Sorry, we can't find the definition of the term you are looking for."
    return messageReceived


@app.route('/')
def index():
    """ Render function """
    return flask.render_template('index.html')


@socketio.on('new feedback')
def on_new_feedback(data):
    """ when receiving new feedback """

    name = data["name"]
    feedback = data["feedback"]
    db.session.add(models.FeedbackLog(name, feedback))
    db.session.commit()

    print("Recieved name: ", name)
    print("Received feedback: ", feedback)


@socketio.on('connect user')
def on_connect(userProfile):
    """ User's profile validating """
    global user_sids
    socketId = request.sid
    name = userProfile['name']
    email = userProfile['email']
    image = userProfile['imageUrl']

    # if user doesn't exist in DB, add user
    if db.session.query(models.UserInfo).filter(models.UserInfo.email==email).first() is None:
        db.session.add(models.UserInfo(email, name, image))
        db.session.commit()

    user_sids[socketId] = email

    socketio.emit('new connection', {
        "user": name,
        "userEmail": email,
        "userImage": image
    }, room=socketId)

def remove_sid_from_dict(socketId):
    " removing sid "
    global user_sids

    if socketId in user_sids:
        email = user_sids.pop(socketId)


@socketio.on('user logout')
def user_logout():
    "remove sid on logout"
    remove_sid_from_dict(request.sid)

@socketio.on('disconnect')
def on_disconnect():
    "remove sid on disconnect "
    remove_sid_from_dict(request.sid)

@socketio.on('word of the day')
def word_of_day():
    " word of the day for dictionary page"
    socketId = flask.request.sid
    politicalLst = ['Cabinet', 'Campaign', 'Candidate', 'Canvass', 'Capitalize', 'Catalyst',
                    'Ballot', 'Bandwagon', 'Barnstorm', 'Bipartisan',
                    'Absentee', 'Accountable', 'Activist', 'Adverse', 'Advertising', 'Advice', 'Advise']
    wordOfDay = random.choice(politicalLst)
    messageReceived = messageDict(wordOfDay)
    socketio.emit('send word of day', {
        'messageReceived': messageReceived,
        'wordOfDay': wordOfDay
    }, room=socketId)


@socketio.on('send message')
def send_message(text):
    "send the synonym of word entered by user"
    socketId = flask.request.sid
    messageReceived = messageDict(text)
    socketio.emit('forward message', {
        'messageReceived': messageReceived
    }, room=socketId)


@socketio.on('request quiz')
def request_quiz():
    """ Selects random quiz questions (one per question group) and sends to user """

    groups = {}
    for row in db.session.query(models.QuizQuestions).all():
        if row.group_name not in groups:
            groups[row.group_name] = []

        groups[row.group_name].append({'text': row.text, 'multiplier': row.multiplier})

    group_names = list(groups.keys())
    random.shuffle(group_names)

    quiz_out = []

    for name in group_names:
        group = groups[name]
        question_index = random.randrange(len(group))

        quiz_out.append(group[question_index])

    sid = flask.request.sid
    socketio.emit('quiz generated', quiz_out, room=sid)


@socketio.on('search news')
def api_call_for_news(data):
    """ API call for News """
    if data == "":
        query = 'politics'
    else:
        query = data
    today = date.today()
    yesterday = today - timedelta(days=1)
    url = 'https://newsapi.org/v2/everything'
    parameters = {
        'q': query,  # query phrase
        'from': yesterday,
        'language': 'en',
        'sortBy': 'relevancy',
        'pageSize': 15,  # maximum is 100
        'apiKey': NEWS_API_KEY
    }

    response = requests.get(url, params=parameters)
    response_json = response.json()

    global newsObjectLst
    newsObjectLst = []
    news_list = response_json["articles"]

    for news in news_list:
        if news["content"] == None:
            final_news_content = "To read full article... "
        else:
            news_content = news["content"].split("…")
            final_news_content = str(news_content[0]) + "... "

        newsObjectLst.append(
            {
                'title': news["title"],
                'author': news["author"],
                'content': final_news_content,
                'published': news["publishedAt"],
                'source': news["source"]["name"],
                'url': news["url"],
                'img': news["urlToImage"]
            }
        )
    socketio.emit('newsData', {
        'newsObjectLst': newsObjectLst
    })

    return response_json["articles"]

def trending_news():
    """Trending news Api call"""
    query = ['Trump', 'Biden', 'election', 'obama', 'Republican', 'democrat', 'governor', 'politics', 'government', 'law', 'state', 'union', 'bills', 'congress']
    random_query=(random.choices(query))
    trend_url = 'https://newsapi.org/v2/top-headlines'
    parameter = {
        'country': 'us',
        'q': random_query, # query phrase
        'pageSize': 3,  # maximum is 100
        'apiKey': NEWS_API_KEY
    }

    response_trend = requests.get(trend_url, params=parameter)
    Response_json = response_trend.json()

    return Response_json["articles"]

@socketio.on('news api call')
def news_api_call():
    """ sending news back to client """
    news_list = api_call_for_news('politics')

    socketio.emit('newsData', {
        'newsObjectLst': newsObjectLst
    })

    news_Trend = trending_news()

    TrendnewsLst = []
    for newz in news_Trend:
        if newz["content"] == None:
            final_news_content = "To read full article... "
        else:
            news_content = newz["content"].split("…")
            final_news_content = str(news_content[0]) + "... "

        TrendnewsLst.append(
            {
                'title': newz["title"],
                'author': newz["author"],
                'content': final_news_content,
                'published': newz["publishedAt"],
                'source': newz["source"]["name"],
                'url': newz["url"],
                'img': newz["urlToImage"]
            }
        )
    socketio.emit('trendNews', {
        'TrendnewsLst': TrendnewsLst
    })

    return newsObjectLst


@socketio.on('state')
def map_state(objState):
    """ state information for map section """
    state = objState['state']
    socketId = flask.request.sid
    news_file = open('states_info.json', 'r')
    news_json = json.load(news_file)
    news_file.close()
    for stateData in news_json['states']:
        if state == stateData['stateCode']:
            socketio.emit('sendState', {
                'sendState': stateData['stateName'],
                'sendPop': stateData['population'],
                'sendVotes': stateData['electoralVotes'],
                'sendSenators': stateData['senators'],
                'sendHouse': stateData['house'],
                'sendWeb': stateData['website']
            }, room=socketId)


@socketio.on('save quiz')
def save_quiz(score):
    """ score saved in database """
    global user_sids
    socketId = flask.request.sid
    if socketId not in user_sids:
        message = 'user not logged in'
    else:
        email = user_sids[socketId]
        existing_record = db.session.query(models.QuizScore).filter(models.QuizScore.email==email)
        if existing_record.first() is not None:
            existing_record.delete()

        db.session.add(models.QuizScore(email, score))
        db.session.commit()
        message = 'success'
    socketio.emit('save quiz response', {'message': message}, room=socketId)


@socketio.on('request prev quiz result')
def get_prev_quiz_result():
    """ previous result fetched from database """
    global user_sids
    socketId = flask.request.sid
    if socketId not in user_sids:
        socketio.emit('prev quiz result', {'message': 'user not logged in'}, room=socketId)
        return
    email = user_sids[socketId]
    record = db.session.query(models.QuizScore).filter(models.QuizScore.email==email).first()
    if record is None:
        socketio.emit('prev quiz result', {'message': 'no record found'}, room=socketId)
    else:
        socketio.emit('prev quiz result', {'message': 'success', 'score': record.score}, room=socketId)


def load_quiz_questions():
    """ Loads the questions for the quiz into the database from the questions JSON file """

    db.session.query(models.QuizQuestions).delete()

    questions_file = open('quiz_questions.json', 'r')
    questions_json = json.load(questions_file)
    questions_file.close()

    for group in questions_json['groups']:
        group_name = group['groupName']
        for question in group['questions']:
            db.session.add(models.QuizQuestions(question['text'], group_name, question['multiplier']))

    db.session.commit()

if __name__ == '__main__':
    models.db.create_all()
    load_quiz_questions()

    user_sids = {}

    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
