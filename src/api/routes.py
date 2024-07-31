"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    get_user = User.query.filter_by(email=email).first()

    if not get_user:
        return jsonify({"msg": "User does not exist"}), 401
    if email != get_user.email or password != get_user.password:
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify({'access_token':access_token, 'current_user':get_user.serialize()})

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    # Get and Show user profile data
    results_query = User.query.filter_by(email=current_user).first()
    if not results_query:
        return jsonify({"error": "User not found"}), 404
    response_body = {
        "msg": "Your user profile:",
        "results": results_query.serialize()
    }
    return jsonify(response_body), 200

# Create a route to signup a new user.
@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not email or not password:
        return jsonify({"error": "Neither email nor password can be blank"}), 404

    check_email = User.query.filter_by(email = email).first()
    if check_email:
        return jsonify({"error": "Email address already exists"}), 404
    
    new_user = User(email = email, is_active = True, password = password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "New user created", "new user": new_user.serialize()}), 200