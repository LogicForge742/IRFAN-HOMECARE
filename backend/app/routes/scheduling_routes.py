from flask import Blueprint, jsonify, request

from app.schemas.scheduling_schema import (
    AvailableSlotsSchema,
)
from app.services.scheduling_service import (
    SchedulingService,
)


scheduling_bp = Blueprint(
    "scheduling",
    __name__,
    url_prefix="/api/scheduling",
)

schema = AvailableSlotsSchema()


@scheduling_bp.get("/professionals/<professional_id>/available-slots")
def get_available_slots(professional_id):

    data = schema.load(
        request.args
    )

    slots = SchedulingService.get_available_slots(
        professional_id,
        data["appointment_date"],
    )

    return jsonify({
        "date": data["appointment_date"].isoformat(),
        "slots": slots,
    }), 200