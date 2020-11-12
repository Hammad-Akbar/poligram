import unittest
import sys
from os.path import dirname, join
from unittest.mock import patch

sys.path.insert(1, join(dirname(__file__), '../'))
import app
import models


class unmockedTest(unittest.TestCase):

    def setUp(self):
        self.user = models.FeedbackLog('I learned a lot about politics', 'Jay Amin')

    def test_database(self):
        self.assertEqual(self.user.feedback, 'I learned a lot about politics')
        self.assertEqual(self.user.name, 'Jay Amin')

    def test_repr(self):
        response = self.user.__repr__()
        result = str({'name': 'Jay Amin', 'feedback': 'I learned a lot about politics'})
        self.assertEqual(response, result)


if __name__ == '__main__':
    unittest.main()
