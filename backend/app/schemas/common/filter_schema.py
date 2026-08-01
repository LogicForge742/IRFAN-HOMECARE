from marshmallow import Schema, fields, validate, INCLUDE
from app.schemas.common.pagination_schema import PaginationSchema
from app.schemas.common.search_schema import SearchSchema

class FilterQuerySchema(PaginationSchema, SearchSchema):
    class Meta:
        unknown = INCLUDE

    sort_by = fields.Str(load_default=None)
    sort_order = fields.Str(load_default="desc", validate=validate.OneOf(["asc", "desc", "ASC", "DESC"]))
    status = fields.Str(load_default=None)
    date_from = fields.Date(load_default=None)
    date_to = fields.Date(load_default=None)
