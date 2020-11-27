""" models.py - creates database tables """

#pylint: disable=R0903

from app import db

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
    text = db.Column(db.String(1024), primary_key=True)
    groupName = db.Column(db.String(128))
    multiplier = db.Column(db.Float)
    
    def __init__(self, text, groupName, multiplier):
        self.text = text
        self.groupName = groupName
        self.multiplier = multiplier
        
    def __repr__(self):
        return str({
            'text': self.text,
            'group name': self.groupName,
            'multiplier': self.multiplier
        })
