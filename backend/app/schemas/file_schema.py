from marshmallow import RAISE, Schema, fields, validate


class FileSchema(Schema):

    class Meta:
        unknown = RAISE

    category = fields.Str(
        required=True,
        validate=validate.OneOf(
            [
                "profile_photo",
                "medical_record",
                "prescription",
                "license",
                "certificate",
                "insurance",
                "receipt",
                "other",
            ]
        ),
    )
