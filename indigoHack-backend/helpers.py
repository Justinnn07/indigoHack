from flask_pymongo import PyMongo
import logging


def connectMongo(app):
    try:
        mongo = PyMongo(app)
        mongo.cx.server_info()
        print("Connected to MongoDB")
        return mongo
    except Exception as e:
        raise ValueError(f"Error connecting to MongoDB: {e}")

def delivery_report(err, msg):
    if err is not None:
        logging.info(f"message delivery failed: {err}")
    else:
        logging.info(f"message delivered to {msg.topic()} [{msg.partition()}]")
