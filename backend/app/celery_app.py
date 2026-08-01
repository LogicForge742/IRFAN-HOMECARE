from celery import Celery

celery = Celery(
    "irfan_homecare",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
)

celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Africa/Nairobi",
    enable_utc=True,
)


class FlaskTask(celery.Task):
    _flask_app = None

    def __call__(self, *args, **kwargs):
        if FlaskTask._flask_app is None:
            from app import create_app

            FlaskTask._flask_app = create_app()
        with FlaskTask._flask_app.app_context():
            return self.run(*args, **kwargs)


celery.Task = FlaskTask
