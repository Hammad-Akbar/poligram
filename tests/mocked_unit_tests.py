import unittest
from unittest.mock import patch
from os.path import dirname, join
import sys

sys.path.insert(1, join(dirname(__file__), '../'))
import app
import json


class mockedTest(unittest.TestCase):
    @patch("app.api_call_for_news")
    def test_app_mock(self, mock_api_call):
        f = open("tests/NEWSDATA.json", "r")
        mock_api_call.return_value.status_code = 200
        mock_api_call.return_value = f.read()

        r_json = json.loads(app.api_call_for_news())

        self.assertEqual(r_json["status"], 'okkk')
        self.assertEqual(r_json["articles"][0]["author"], 'Lisa Lerer')
        self.assertEqual(r_json["articles"][0]["source"]["id"], 'None')
        self.assertEqual(r_json["articles"][0]["source"]["name"], 'New York Times')
        f.close()

    @patch("app.send_message")
    def test_dictionary_failure(self, mocked_get):
        mocked_get.return_value.json.return_value = ["added", "daddy", "add", "adds", "dad", "dads", "dead",
                                                     "deed", "did", "dido",
                                                     "died", "dodo", "dud", "dude", "duds", "dyad",
                                                     "dyed", "eddy", "odd", "odds"]

        response = app.messageDict(mocked_get.return_value.json.return_value)
        result = "Sorry, we can't find the definition of the term you are looking for."
        self.assertEqual(response, result)

    @patch("app.send_message")
    def test_dictionary_success(self, mocked_get):
        mocked_get.return_value.json.return_value = [{"shortdef": ["a piece of paper indicating a person\u0027s "
                                                                   "preferences in an election",
                                                                   "the right to formally express one\u0027s "
                                                                   "position "
                                                                   "or will in an election"]}]
        response = app.messageDict(mocked_get.return_value.json.return_value)
        result = "a piece of paper indicating a person\u0027s " \
                 "preferences in an election, " \
                 "the right to formally express one\u0027s " \
                 "position " \
                 "or will in an election"
        self.assertEqual(response, result)

    def test_new_user_connection(self):
        flask_test_client = app.app.test_client()
        socketio_test_client = app.socketio.test_client(app.app,
                                                        flask_test_client=flask_test_client)
        socketio_test_client.emit('connect user', {
            "name": "Jay Amin",
            "email": "juiamin1000@gmail.com",
            "imageUrl": "profile.jpg"
        })
        result = socketio_test_client.get_received()
        user = result[0]['args'][0]['user']
        self.assertEqual(user, 'Jay Amin')

    def test_socket_send_dict(self):
        flask_test_client = app.app.test_client()
        socketio_test_client = app.socketio.test_client(app.app,
                                                        flask_test_client=flask_test_client)
        socketio_test_client.emit('send message', 'ballot')
        result = socketio_test_client.get_received()
        message = result[0]['args'][0]['messageReceived']
        self.assertEqual(message, "a piece of paper indicating a person's preferences in an election, "
                                  "the right to formally express one's position or will in an election")

    def test_home(self):
        tester = app.app.test_client(self)
        response = tester.get('/', content_type='html')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
