"""Unmocked unit test"""
#pylint: disable=C0103
import unittest
from os.path import dirname, join
import sys

sys.path.insert(1, join(dirname(__file__), '../'))
import app
import models


class unmockedTest(unittest.TestCase):
    """Unmocked unit test cases """
    def setUp(self):
        self.user = models.FeedbackLog('Jay Amin', 'I learned a lot about politics')

    def test_app_mock(self):
        """ News api unmocked test cases """
        r_json = (app.news_api_call())

        assert len(r_json) > 1

        for i in r_json:
            self.assertFalse(i["source"] == " ", "False or True")
            self.assertFalse(i["author"] == " ", "False or True")
            self.assertFalse(i["title"] == " ", "False or True")
            self.assertFalse(i["img"] == " ", "False or True")
            self.assertFalse(i["url"] == " ", "False or True")
            self.assertFalse(i["published"] == " ", "False or True")
            self.assertFalse(i["content"] == " ", "False or True")

    def test_database(self):
        """ database unmocked test cases """
        self.assertEqual(self.user.feedback, 'I learned a lot about politics')
        self.assertEqual(self.user.name, 'Jay Amin')

    def test_repr(self):
        """ Feedback form unmocked test cases """
        response = self.user.__repr__()
        result = str({'name': 'Jay Amin', 'feedback': 'I learned a lot about politics'})
        self.assertEqual(response, result)


if __name__ == '__main__':
    unittest.main()
