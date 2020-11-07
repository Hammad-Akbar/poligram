from app import db


class TestModel(db.Model):
    ''' test model '''
    __tablename__ = "poligram_test_table"
    
    field1 = db.Column(db.String(32), primary_key=True)
    field2 = db.Column(db.Integer)
    field3 = db.Column(db.String(64))
    
    def __init__(self, field1, field2, field3):
        self.field1 = field1
        self.field2 = field2
        self.field3 = field3

db.create_all()
db.session.commit()
