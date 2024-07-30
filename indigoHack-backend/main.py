from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from helpers import connectMongo, delivery_report
from bson import ObjectId
import threading
from flask_socketio import SocketIO
import json
import os
from confluent_kafka import Producer, Consumer, KafkaException, KafkaError
from models import Flight, User
import logging
from werkzeug.security import check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from firebase_admin import messaging, credentials, initialize_app

load_dotenv()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

firebase_config = {
    "type": os.getenv("TYPE"),
    "project_id": os.getenv("PROJECT_ID"),
    "private_key_id": os.getenv("PRIVATE_KEY_ID"),
    "private_key": os.getenv("PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": os.getenv("CLIENT_EMAIL"),
    "client_id": os.getenv("CLIENT_ID"),
    "auth_uri": os.getenv("AUTH_URI"),
    "token_uri": os.getenv("TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL"),
    "universe_domain": os.getenv("UNIVERSE_DOMAIN"),
}

cred = credentials.Certificate(firebase_config)
initialize_app(cred)

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/indigoHack"
app.config["JWT_SECRET_KEY"] = "indigoHackBackend"  
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False 

jwt = JWTManager(app)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

mongo = connectMongo(app)

producer_conf = {
    'bootstrap.servers': os.getenv("KAFKA_BOOTSTRAP_SERVERS", 'localhost:9092'),
    'client.id': 'flight-producer'
}
producer = Producer(**producer_conf)

def send_push_notification(token, title, body):
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        token=token
    )
    try:
        response = messaging.send(message)
        logger.debug(f'Successfully sent message: {response}')
    except Exception as e:
        logger.error(f'Error sending message: {e}')


# Root Endpoint
@app.route("/")
@cross_origin()
def main():
    logger.debug("Root endpoint hit")
    return "App is running on 5500"
# User Routes
@app.route('/api/create-user', methods=['POST'])
@jwt_required()
@cross_origin()
def create_user():
    data = request.json
    user_email = get_jwt_identity()
    if user_email == 'admin@goindigo.in':
        if 'email' not in data or 'password' not in data or 'name' not in data:
            return jsonify({"error": "Missing required fields"}), 400
        
        if mongo.db.users.find_one({"email": data['email']}):
            return jsonify({"error": "User already exists"}), 400
        
        user = User.from_dict(data)
        user_dict = user.to_dict()
        mongo.db.users.insert_one(user_dict)
        
        return jsonify({"message": "user created successfully"}), 201
    else:
        return jsonify({"error": "You're not an admin."})


@app.route('/api/users', methods=['GET'])
@cross_origin()
@jwt_required()
def get_users():
    user_email = get_jwt_identity()
    if user_email == 'admin@goindigo.in':
        try:
            users = list(mongo.db.users.find({}))
            for user in users:
                user['_id'] = str(user['_id'])
            return jsonify(users), 200
        except Exception as e:
            logger.error(f"Error fetching isers: {e}")
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "You are not an admin."})

@app.route('/api/users/<user_id>', methods=['GET'])
@cross_origin()
@jwt_required()
def get_user_by_id(user_id):
    user_email = get_jwt_identity()
    if user_email == 'admin@goindigo.in':
        try:
            user_id = ObjectId(user_id)
            user = mongo.db.users.find_one({"_id": user_id})
            if user:
                user['_id'] = str(user['_id'])
                return jsonify(user), 200
            else:
                return jsonify({"error": "User not found"}), 404
        except Exception as e:
            logger.error(f"Error fetching user by id: {e}")
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "You are not an admin."}), 403

@app.route('/api/users/<user_id>', methods=['PUT'])
@cross_origin()
def update_user_by_id(user_id):
    try:
        user_id = ObjectId(user_id)
        data = request.json
            
        existing_user = mongo.db.users.find_one({"_id": user_id})
        if not existing_user:
            return jsonify({"error": "User not found"}), 404
            
        updated_fields = {}
        if 'email' in data:
            updated_fields['email'] = data['email']
        if 'flight_details' in data:
            updated_fields['flight_details'] = data['flight_details']
        if 'name' in data:
            updated_fields['name'] = data['name']
        if 'access_token' in data:
            updated_fields['access_token'] = data['access_token']
        if 'mobile_number' in data:
            updated_fields['mobile_number'] = data['mobile_number']
        if 'is_admin' in data:
            updated_fields['is_admin'] = data['is_admin']
        if 'device_token' in data:
            updated_fields['device_token'] = data['device_token']
            
        mongo.db.users.update_one({"_id": user_id}, {"$set": updated_fields})
        return jsonify({"message": "User updated successfully"}), 200
        
    except Exception as e:
            logger.error(f"Error updating user by id: {e}")
            return jsonify({"error": str(e)}), 500

    
@app.route('/api/login', methods=['POST'])
@cross_origin()
def login():
    data = request.json
    if 'email' not in data or 'password' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    user = mongo.db.users.find_one({"email": data['email']})
    if user is None or not check_password_hash(user['password'], data['password']):
        return jsonify({"error": "Invalid email or password"}), 401
    
    access_token = create_access_token(identity=user['email'])
    return jsonify({"message": "Login successful", "access_token": access_token})

@app.route('/api/user', methods=['GET'])
@jwt_required()
@cross_origin()
def current_user():
    current_user_email = get_jwt_identity()
    user = mongo.db.users.find_one({"email": current_user_email})
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    user['_id'] = str(user['_id'])
    return jsonify(user)

# flight ops
@app.route('/api/add-flight', methods=['POST'])
@cross_origin()
def add_flight():
    try:
        data = request.get_json()
        flight = Flight.from_dict(data)
        mongo.db.departures.insert_one(flight.to_dict())  
        logger.debug(f"Flight added: {flight.to_dict()}")
        socketio.emit("new_flight", flight.to_dict())
        return jsonify({"message": "Flight added successfully!"}), 201
    except Exception as e:
        logger.error(f"Error adding flight: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/flights', methods=['GET'])
@cross_origin()
def get_flights():
    try:
        flights = list(mongo.db.departures.find({}))
        for flight in flights:
            flight['_id'] = str(flight['_id'])
        logger.debug(f"Fetched flights: {flights}")
        return jsonify(flights), 200
    except Exception as e:
        logger.error(f"Error fetching flights: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/flight/<flight_id>', methods=['DELETE'])
@cross_origin()
def delete_flight(flight_id):
    try:
        flight_id = ObjectId(flight_id)
    except Exception as e:
        logger.error(f"Invalid flight ID: {e}")
        return jsonify({"error": "Invalid flight ID"}), 400

    try:
        result = mongo.db.departures.delete_one({"_id": flight_id})
        if result.deleted_count:
            logger.debug(f"Deleted flight with ID: {flight_id}")
            return jsonify({"message": "Flight deleted"}), 200
        else:
            logger.error(f"Flight not found for ID: {flight_id}")
            return jsonify({"error": "Flight not found"}), 404
    except Exception as e:
        logger.error(f"Error deleting flight: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/flight/<flight_id>', methods=['GET'])
@cross_origin()
def get_flight(flight_id):
    try:
        flight_id = ObjectId(flight_id)
    except Exception as e:
        logger.error(f"Invalid flight ID: {e}")
        return jsonify({"error": "Invalid flight ID"}), 400

    try:
        flight = mongo.db.departures.find_one({"_id": flight_id})
        if flight:
            flight['_id'] = str(flight['_id'])
            logger.debug(f"Fetched flight: {flight}")
            return jsonify(flight), 200
        else:
            logger.error(f"Flight not found for ID: {flight_id}")
            return jsonify({"error": "Flight not found"}), 404
    except Exception as e:
        logger.error(f"Error fetching flight: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/update-flight/<flight_id>', methods=['PUT'])
@cross_origin()
def update_flight(flight_id):
    try:
        flight_id = ObjectId(flight_id)
        data = request.get_json()
        new_flight_details = Flight.from_dict(data).to_dict()

        current_flight = mongo.db.departures.find_one({'_id': flight_id})
        if not current_flight:
            return jsonify({"error": "Flight not found"}), 404

        gate_changed = (current_flight['departure'].get('boarding_time') != new_flight_details['departure'].get('boarding_time'))
        status_changed = (current_flight['flight_status'] != new_flight_details['flight_status'])

        mongo.db.departures.update_one({'_id': flight_id}, {'$set': new_flight_details})

        kafka_message = {
            "flight_id": str(flight_id),
            "update_fields": new_flight_details
        }
        logger.debug(f"Producing message: {kafka_message}")
        producer.produce('flight_updates', value=json.dumps(kafka_message), callback=delivery_report)
        producer.poll(0)

        changes = []
        if gate_changed:
            changes.append(f'Boarding has changed to {new_flight_details["departure"]["boarding_time"]}')
        if status_changed:
            changes.append(f'Flight status has changed to {new_flight_details["flight_status"]['status']}, gate:{new_flight_details["flight_status"]['gate']} ')

        if changes:
            message_body = ' '.join(changes)
            users = list(mongo.db.users.find({"flight_details._id": str(flight_id)}))
            for user in users:
                if 'device_token' in user and user['device_token']:
                    send_push_notification(
                        user['device_token'],
                        'Flight Update',
                        f'Dear {user["name"]}, {message_body}.'
                    )

        return jsonify({
            "message": "Flight updated successfully!",
            "changes": changes
        }), 200
    except Exception as e:
        logger.error(f"Error updating flight: {e}")
        return jsonify({"error": str(e)}), 500
def kafka_listener():
    consumer_conf = {
        'bootstrap.servers': os.getenv("KAFKA_BOOTSTRAP_SERVERS", 'localhost:9092'),
        'group.id': 'flight-consumer-group',
        'auto.offset.reset': 'earliest'
    }
    consumer = Consumer(consumer_conf)
    consumer.subscribe(['flight_updates'])

    try:
        while True:
            msg = consumer.poll(1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                else:
                    logger.error(f"Kafka error: {msg.error()}")
                    break

            data = json.loads(msg.value().decode('utf-8'))
            logger.debug(f"Received message: {data}")
            socketio.emit('flight_update', data)
    except KafkaException as e:
        logger.error(f"Kafka exception: {e}")
    finally:
        consumer.close()

@socketio.on('connect')
def handle_connect():
    logger.debug('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    logger.debug('Client disconnected')

if __name__ == '__main__':
    kafka_thread = threading.Thread(target=kafka_listener)
    kafka_thread.daemon = True
    kafka_thread.start()
    app.run(debug=True, port=5500)
