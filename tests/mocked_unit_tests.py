import unittest
from unittest.mock import patch
from os.path import dirname, join
import sys
sys.path.insert(1, join(dirname(__file__), '../'))
import app
import json


class TestNews(unittest.TestCase):

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
    

if __name__ == "__main__":
	unittest.main()