import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class Flight:
    def __init__(self, airline, departure, arrival, flight_status):
        self.airline = airline
        self.departure = departure
        self.arrival = arrival
        self.flight_status = flight_status

    @classmethod
    def from_dict(cls, data):
        return cls(
            airline=data['airline'],
            departure={
                'date_time': data['departure']['date_time'],
                'location': data['departure']['location'],
                'boarding_time': data['departure']['boarding_time'],
            },
            arrival={
                'date_time': data['arrival']['date_time'],
                'location': data['arrival']['location']
            },
            flight_status=data['flight_status']
        )

    def to_dict(self):
        return {
            "airline": self.airline,
            "departure": {
                "date_time": self.departure['date_time'],
                "location": self.departure['location'],
                "boarding_time": self.departure['boarding_time']
            },
            "arrival": {
                "date_time": self.arrival['date_time'],
                "location": self.arrival['location']
            },
            "flight_status": self.flight_status
        }

class User:
    def __init__(self, email, password, flight_details, name, access_token=None, mobile_number=None, is_admin=False, device_token=''):
        self.email = email
        self.password = generate_password_hash(password)
        self.flight_details = flight_details
        self.name = name
        self.access_token = access_token
        self.mobile_number = mobile_number
        self.is_admin = is_admin
        self.device_token = device_token

    @classmethod
    def from_dict(cls, data):
        return cls(
            email=data['email'],
            password=data['password'],
            flight_details=data.get('flight_details', {}),
            name=data['name'],
            access_token=data.get('access_token'),
            mobile_number=data.get('mobile_number'),
            is_admin=data.get('is_admin', False),
            device_token=data.get('device_token', '')
        )

    def to_dict(self):
        return {
            "email": self.email,
            "password": self.password,
            "flight_details": self.flight_details,
            "name": self.name,
            "access_token": self.access_token,
            "mobile_number": self.mobile_number,
            "is_admin": self.is_admin,
            "device_token": self.device_token
        }