from marshmallow import Schema, fields

class GroceryItemSchema(Schema):
    id = fields.String(required=True)
    col1 = fields.String(required=True)
    col2 = fields.String(required=True)
    col3 = fields.String(required=True)
