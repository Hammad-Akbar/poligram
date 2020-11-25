"""Mocked unit test"""
#pylint: disable=C0301
#pylint: disable=C0103
#pylint: disable=W0613
import unittest
from unittest.mock import patch
from os.path import dirname, join
import sys

sys.path.insert(1, join(dirname(__file__), '../'))
import json
import app


class mockedTest(unittest.TestCase):
    """ Mocked unit test cases """
    def setUp(self):
        """feedback db Mocked unit test"""
        self.success_test_params = [
            {
                "name" : "Hammad",
                "feedback" : "test"
            }
        ]

        self.failure_test_params = [
            {
                "name" : 123,
                "feedback" : 123
            }
        ]

    @patch("app.api_call_for_news")
    def test_app_mock(self, mock_api_call):
        """News api Mocked unit test"""
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
        """dictionary api Mocked unit test"""
        with patch('app.requests.get') as mocked_get:
            mocked_get.return_value.json.return_value = ["added", "daddy", "add", "adds", "dad", "dads", "dead",
                                                        "deed", "did", "dido",
                                                        "died", "dodo", "dud", "dude", "duds", "dyad",
                                                        "dyed", "eddy", "odd", "odds"]

            response = app.messageDict('dddd')
            result = "Sorry, we can't find the definition of the term you are looking for."
            self.assertEqual(response, result)

    @patch("app.send_message")
    def test_dictionary_success(self, mocked_get):
        """dictionary api Mocked unit test"""
        with patch('app.requests.get') as mocked_get:
            mocked_get.return_value.json.return_value = [{"shortdef": ["a piece of paper indicating a person\u0027s "
                                                                        "preferences in an election",
                                                                        "the right to formally express one\u0027s "
                                                                        "position "
                                                                        "or will in an election"]}]
            response = app.messageDict('ballot')
            result = "a piece of paper indicating a person\u0027s " \
                 "preferences in an election, " \
                 "the right to formally express one\u0027s " \
                 "position " \
                 "or will in an election"
            self.assertEqual(response, result)

    def test_new_user_connection(self):
        """user connection Mocked unit test"""
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
        """dictionary api Mocked unit test"""
        flask_test_client = app.app.test_client()
        socketio_test_client = app.socketio.test_client(app.app,
                                                        flask_test_client=flask_test_client)
        socketio_test_client.emit('send message', 'ballot')
        result = socketio_test_client.get_received()
        message = result[0]['args'][0]['messageReceived']
        emitmessage = result[0]['name']
        self.assertEqual(message, "a piece of paper indicating a person's preferences in an election, "
                                "the right to formally express one's position or will in an election")
        self.assertEqual(emitmessage, "forward message")

    def test_on_new_message_success(self):
        """ testing success of new feedback  """

        for test in self.success_test_params:
            with unittest.mock.patch('flask_sqlalchemy.SignallingSession.add', self.mock_session_add):
                app.on_new_feedback(test)

    def test_on_new_message_failure(self):
        """ testing failure of new feedback  """

        for test in self.failure_test_params:
            with unittest.mock.patch('flask_sqlalchemy.SignallingSession.add', self.mock_session_add):
                app.on_new_feedback(test)

    def mock_session_commit(self):
        """ mock session.commit() for db """
        return

    def mock_session_add(self, holder):
        """ mock session.add() for db """
        return

    def test_home(self):
        """homepage api Mocked unit test"""
        tester = app.app.test_client(self)
        response = tester.get('/', content_type='html')
        self.assertEqual(response.status_code, 200)

    @patch('app.flask')
    def test_quiz_generation(self, mocked_flask):
        """Quiz Mocked unit test"""
        mocked_flask.request.sid = 'abcdef'

        def mocked_open(file, mode):
            """Quiz Mocked unit test"""
            return open("tests/fake_questions.json", 'r')

        def mocked_emit(event, data, room):
            """Quiz Mocked unit test"""
            self.assertEqual(event, "quiz generated")
            self.assertEqual(room, "abcdef")
            self.assertTrue(isinstance(data, list))
            self.assertEqual(len(data), 1)
            self.assertTrue(isinstance(data[0], dict))
            self.assertEqual(data[0]['text'], "Test question for unittest")
            self.assertEqual(data[0]['multiplier'], 99)

        with unittest.mock.patch('app.open', mocked_open):
            with unittest.mock.patch('app.socketio.emit', mocked_emit):
                app.request_quiz()


if __name__ == '__main__':
    unittest.main()
