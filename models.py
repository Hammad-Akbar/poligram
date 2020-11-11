""" models.py - creates database tables """

from app import db

class NameLog(db.Model):
    """ Add name table to database """

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))

    def __init__(self, a_name):
        self.name = a_name

    def __repr__(self):
        return '<Name: %s>' % self.name

class FeedbackLog(db.Model):
    """ Add feedback table to database """

    id = db.Column(db.Integer, primary_key=True)
    feedback = db.Column(db.String(1000))

    def __init__(self, a_feedback):
        self.feedback = a_feedback

    def __repr__(self):
        return '<Feedback: %s>' % self.feedback


