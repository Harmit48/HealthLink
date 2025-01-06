from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# In-memory storage for simplicity (in production, use a database)
users = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user_id = data['id']
    password = data['password']

    # Check if the user already exists
    if user_id in users:
        return jsonify({"message": "User already exists!"}), 400

    # Register the new user
    users[user_id] = password
    return jsonify({"message": "User registered successfully!"}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id = data['id']
    password = data['password']

    # Check if the user exists and the password matches
    if user_id not in users:
        return jsonify({"message": "User not found!"}), 404

    if users[user_id] != password:
        return jsonify({"message": "Invalid password!"}), 403

    return jsonify({"message": "Login successful!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
