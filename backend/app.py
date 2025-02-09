from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess, sys
from test import streamingAPI
from scuapi import MatchNotFound, InvalidJSON

# COLORS
RED = "\033[31m"
DEFAULT = "\033[0m"

app = Flask(__name__)
CORS(app)

@app.route("/content/<string:name>", methods=["GET"])
def getContentSlug(name):
    try:
        id, slug = streamingAPI.getContent(name)
        return jsonify({"link": str(id)+"-"+slug}), 200
    except MatchNotFound as e:
        return jsonify({"error": f"{name} not found"}), 404
    except InvalidJSON as e:
        print(f"{RED}{str(e)}{DEFAULT}")
        return jsonify({"error": "Invalid JSON"}), 500
    except Exception as e:
        print(f"{RED}{str(e)}{DEFAULT}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route("/movies/<string:slug>", methods=["GET"])
def getMovieLink(slug):
    try:    
        link = streamingAPI.getMovieLink(slug)    
        return jsonify({"link": link}), 200
    except InvalidJSON as e:
        print(f"{RED}{str(e)}{DEFAULT}")
        return jsonify({"error": "Invalid JSON"}), 500
    except Exception as e:
        print(f"{RED}{str(e)}{DEFAULT}")
        return jsonify({"error": "Internal Server Error"}), 500
    
@app.route("/tv/<string:slug>/seasons/<int:season_number>", methods=["GET"])
def getSeasonIds(slug, season_number):
    try:    
        data = streamingAPI.getSeasonIds(slug, season_number)    
        return jsonify({"idS": data}), 200
    except InvalidJSON as e:
        print(f"{RED}{str(e)}{DEFAULT}")
        return jsonify({"error": "Invalid JSON"}), 500
    except Exception as e:
        print(f"{RED}{str(e)}{DEFAULT}")
        return jsonify({"error": "Internal Server Error"}), 500
    
@app.route("/tv/<string:slug>/episodes/<int:episode_id>", methods=["GET"])
def getEpisodeLink(slug, episode_id):
    try:    
        data = streamingAPI.getEpisodeLink(slug, episode_id)    
        return jsonify({"link": data}), 200
    except InvalidJSON as e:
        print(f"{RED}{str(e)}{DEFAULT}")
        return jsonify({"error": "Invalid JSON"}), 500
    except Exception as e:
        print(f"{RED}{str(e)}{DEFAULT}")
        return jsonify({"error": "Internal Server Error"}), 500
    