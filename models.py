""" models.py - creates database tables """

from app import db

class FeedbackLog(db.Model):
    """ Add feedback table to database """

    id = db.Column(db.Integer, primary_key=True)
    feedback = db.Column(db.String(1000))
    name = db.Column(db.String(1000))

    def __init__(self, a_feedback, a_name):
        self.feedback = a_feedback
        self.name = a_name

    def __repr__(self):
        return '<Name, Feedback: %s , %s>' % self.name , self.feedback


