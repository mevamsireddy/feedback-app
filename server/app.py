from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

# Load env variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["feedbackDB"]
feedback_collection = db["feedbacks"]

@app.route("/feedback", methods=["POST"])
def submit_feedback():
    data = request.get_json()
    feedback = {
        "name": data["name"],
        "email": data["email"],
        "message": data["message"],
        "timestamp": datetime.utcnow()
    }
    result = feedback_collection.insert_one(feedback)
    return jsonify({"message": "Feedback submitted", "id": str(result.inserted_id)}), 201

@app.route("/feedback", methods=["GET"])
def get_feedback():
    feedbacks = list(feedback_collection.find({}, {"_id": 0}))
    return jsonify(feedbacks), 200

if __name__ == "__main__":
    app.run(debug=True)
