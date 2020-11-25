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
