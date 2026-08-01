from app.extensions import db
from app.core.query import build_query

class BaseRepository:
    model = None

    @classmethod
    def get_query(cls):
        if cls.model is None:
            raise NotImplementedError("Repository subclass must specify the 'model' class attribute.")
        return cls.model.query

    @classmethod
    def get_by_id(cls, record_id):
        if cls.model is None:
            raise NotImplementedError("Repository subclass must specify the 'model' class attribute.")
        return cls.model.query.get(record_id)

    @classmethod
    def create(cls, instance):
        db.session.add(instance)
        db.session.commit()
        return instance

    @classmethod
    def update(cls):
        db.session.commit()

    @classmethod
    def delete(cls, instance):
        db.session.delete(instance)
        db.session.commit()

    @classmethod
    def find_all(cls, params=None, search_fields=None):
        """
        Retrieves records using the query builder (search, filters, sort, pagination).
        Returns dict with "items" and "metadata".
        """
        query = cls.get_query()
        return build_query(query, cls.model, params, search_fields)
