""" models.py - creates database tables """

#pylint: disable=R0903
#pylint: disable=E1101

from app import db

import datetime as dt

class FeedbackLog(db.Model):
    """ Add feedback table to database """

    email = db.Column(db.String(1000), primary_key=True)
    feedback = db.Column(db.String(1000))
    name = db.Column(db.String(1000))

    def __init__(self, a_name, a_feedback):
        self.name = a_name
        self.feedback = a_feedback

    def __repr__(self):
        return str({
            'name': self.name,
            'feedback': self.feedback
        })

class QuizQuestions(db.Model):
    """ Quiz question stored in database """
    text = db.Column(db.String(1024), primary_key=True)
    group_name = db.Column(db.String(128))
    multiplier = db.Column(db.Float)
    def __init__(self, text, group_name, multiplier):
        self.text = text
        self.group_name = group_name
        self.multiplier = multiplier

    def __repr__(self):
        return str({
            'text': self.text,
            'group name': self.group_name,
            'multiplier': self.multiplier
        })

class UserInfo(db.Model):
    """ User's login info saved to database """
    email = db.Column(db.String(256), primary_key=True)
    name = db.Column(db.String(256))
    img_url = db.Column(db.String(512))

    def __init__(self, email, name, img_url):
        self.email = email
        self.name = name
        self.img_url = img_url

    def __repr__(self):
        return str({
            'email': self.email,
            'name': self.name,
            'img_url': self.img_url
        })

class QuizScore(db.Model):
    """ Quiz score saved to database """
    email = db.Column(db.String(256), primary_key=True)
    score = db.Column(db.Integer)

    def __init__(self, email, score):
        self.email = email
        self.score = score

    def __repr__(self):
        return str({
            'email': self.email,
            'score': self.score,
        })
