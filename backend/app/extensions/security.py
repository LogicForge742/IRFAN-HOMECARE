from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman

from app.config.security import SecurityConfig

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=SecurityConfig.DEFAULT_RATE_LIMITS,
)

talisman = Talisman()
