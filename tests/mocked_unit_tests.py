"""Mocked unit test"""
# pylint: disable=C0301
# pylint: disable=C0103
# pylint: disable=W0613
# pylint: disable=W0107
import unittest
from unittest.mock import patch
from os.path import dirname, join
import sys

sys.path.insert(1, join(dirname(__file__), '../'))
import json
import app


class MockedTest(unittest.TestCase):
    """ Mocked unit test cases """

    def setUp(self):
        """feedback db Mocked unit test"""
        self.success_test_params = [
            {
                "name": "Hammad",
                "feedback": "test"
            }
        ]

        self.failure_test_params = [
            {
                "name": 123,
                "feedback": 123
            }
        ]

    class MockSession:
        """mock session"""
        def add(self, value):
            """add"""
            pass

        def commit(self):
            """commit"""
            pass

        def remove(self):
            """remove"""
            pass

        def query(self, param):
            """query"""
            return self

        def filter(self, param):
            """filter"""
            return self

        def first(self):
            """first"""
            return None

    @patch("app.api_call_for_news")
    def test_app_mock(self, mock_api_call):
        """News api Mocked unit test"""
        f = open("tests/NEWSDATA.json", "r")
        mock_api_call.return_value.status_code = 200
        mock_api_call.return_value = f.read()

        r_json = json.loads(app.api_call_for_news("news"))

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
            mocked_get.return_value.json.return_value = [{"shortdef": ["A piece of paper indicating a person\u0027s "
                                                                       "preferences in an election",
                                                                       "the right to formally express one\u0027s "
                                                                       "position "
                                                                       "or will in an election"]}]
            response = app.messageDict('ballot')
            result = "A piece of paper indicating a person\u0027s " \
                     "preferences in an election, " \
                     "the right to formally express one\u0027s " \
                     "position " \
                     "or will in an election"
            self.assertEqual(response, result)

    def test_socket_dictionary(self):
        """mocked test to check dictionary api"""
        flask_test_client = app.app.test_client()
        with unittest.mock.patch('app.messageDict') as mocked_messageDict:
            mocked_messageDict.return_value = "A piece of paper indicating a person's preferences in an election, " \
                                              "the right to formally express one's position or will in an election"
            socketio_test_client = app.socketio.test_client(app.app,
                                                            flask_test_client=flask_test_client)
            socketio_test_client.emit('send message', 'ballot')
            result = socketio_test_client.get_received()
            message = result[0]['args'][0]['messageReceived']
            self.assertEqual(message, "A piece of paper indicating a person's preferences in an election, "
                                      "the right to formally express one's position or will in an election")

    def test_word_of_day(self):
        """mocked test to check word of the day"""
        flask_test_client = app.app.test_client()
        with unittest.mock.patch('app.messageDict') as mocked_messageDict:
            mocked_messageDict.return_value = "None"
            socketio_test_client = app.socketio.test_client(app.app,
                                                            flask_test_client=flask_test_client)
            socketio_test_client.emit('word of the day')
            result = socketio_test_client.get_received()
            message = result[0]['args'][0]['messageReceived']
            self.assertNotEqual(message, "A piece of paper indicating a person's preferences in an election, "
                                      "the right to formally express one's position or will in an election")

    @patch('app.flask')
    def test_map_feature(self, mocked_flask):
        """mocked test for map method"""
        mocked_flask.request.sid = 'abcdef'

        def mocked_open(file, mode):
            """file open for fake map json data"""
            return open("tests/fake_map.json", 'r')

        def mocked_emit(event, data, room):
            """socket mocked test for map data"""
            self.assertEqual(event, "sendState")
            self.assertEqual(room, "abcdef")
            self.assertEqual(data, {
                'sendState': 'Fake State',
                'sendPop': 'FK',
                'sendVotes': '10',
                'sendSenators': '5',
                'sendHouse': '5',
                'sendWeb': 'gov.org'
            })

        with unittest.mock.patch('app.open', mocked_open):
            with unittest.mock.patch('app.socketio.emit', mocked_emit):
                app.map_state(objState={'state': 'Fake State'})

    @patch("app.db.session", MockSession())
    @patch("app.user_sids", create=True)
    def test_new_user_connection(self, mock_sids):
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

    def test_on_new_message_success(self):
        """ testing success of new feedback  """
        mock_session = self.MockSession()
        for test in self.success_test_params:
            with unittest.mock.patch('app.db.session', mock_session):
                app.on_new_feedback(test)

    def test_on_new_message_failure(self):
        """ testing failure of new feedback  """
        for test in self.failure_test_params:
            mock_session = self.MockSession()
            with unittest.mock.patch('app.db.session', mock_session):
                app.on_new_feedback(test)

    def test_home(self):
        """homepage api Mocked unit test"""
        tester = app.app.test_client(self)
        response = tester.get('/', content_type='html')
        self.assertEqual(response.status_code, 200)

    @patch('app.flask')
    def test_quiz_generation(self, mocked_flask):
        """Quiz Mocked unit test"""
        mocked_flask.request.sid = 'abcdef'

        class MockSession:
            """mock session"""
            class MockQuery:
                """mock query"""
                def all(self):
                    """all"""
                    class MockRecord:
                        """mock record"""
                        def __init__(self, text, group_name, multiplier):
                            self.text = text
                            self.group_name = group_name
                            self.multiplier = multiplier

                    return [MockRecord('Test question for unit test', 'unittest group', 99)]

            def query(self, param):
                """mocked query"""
                return self.MockQuery()

        def mocked_emit(event, data, room):
            """Quiz Mocked unit test"""
            self.assertEqual(event, "quiz generated")
            self.assertEqual(room, "abcdef")
            self.assertTrue(isinstance(data, list))
            self.assertEqual(len(data), 1)
            self.assertTrue(isinstance(data[0], dict))
            self.assertEqual(data[0]['text'], "Test question for unit test")
            self.assertEqual(data[0]['multiplier'], 99)

        with unittest.mock.patch('app.db.session', MockSession()):
            with unittest.mock.patch('app.socketio.emit', mocked_emit):
                app.request_quiz()

    def test_quiz_load(self):
        """ testing for quiz load method"""
        class MockSession:
            """mock session"""
            def __init__(self, unittest_class):
                """initial method to assign variables"""
                self.questions = []
                self.unittest_class = unittest_class

            class MockQuery:
                """ mocking query """
                def delete(self):
                    """deleting method"""
                    pass

            def query(self, param):
                """query"""
                return self.MockQuery()

            def commit(self):
                """commit"""
                pass

            def add(self, question_record):
                """make sure question texts are all unique, since text is used as primary key"""
                self.unittest_class.assertNotIn(question_record.text, self.questions)
                self.questions.append(question_record.text)

        with unittest.mock.patch('app.db.session', MockSession(self)):
            app.load_quiz_questions()
    
    @patch('app.flask')
    def test_quiz_save(self, mocked_flask):
        """ Test for save_quiz function """
        mocked_flask.request.sid = 'abcdef'
        
        expected_msg = ""
        def mocked_emit(event, data, room):
            """ Mocked socketIO emit to test that correct message is being emitted """
            self.assertEqual(data['message'], expected_msg)
            self.assertEqual(room, 'abcdef')
        
        with unittest.mock.patch('app.db.session', self.MockSession()):
            with unittest.mock.patch('app.socketio.emit', mocked_emit):
                with unittest.mock.patch('app.user_sids', {}, create=True):
                    expected_msg = 'user not logged in'
                    app.save_quiz(50)
                    
                with unittest.mock.patch('app.user_sids', {'abcdef': 'test@test.com'}, create=True):
                    expected_msg = 'success'
                    app.save_quiz(-90)
    
    

if __name__ == '__main__':
    unittest.main()
