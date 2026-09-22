import multiprocessing
import os

bind = "0.0.0.0:" + os.environ.get("PORT", "8000")
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
timeout = 120
keepalive = 5
errorlog = "-"
accesslog = "-"
loglevel = os.environ.get("LOG_LEVEL", "info")
