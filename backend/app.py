from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route("/movies/<string:movie>", methods=["GET"])
def getMovieLink(movie):
    try:        
        result = subprocess.run(['python', 'test.py', 'movie', movie], capture_output=True, text=True)
        return jsonify({'link': result.stdout, 'error': result.stderr})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route("/tv/<string:tv>/<string:season>/<string:episode>", methods = ["GET"])
def getEpisodeLink(tv, season, episode):
    try:
        result = subprocess.run(['python', 'test.py', 'tv', tv, season, episode], capture_output=True, text=True)
        return jsonify({'link': result.stdout, 'error': result.stderr})
    except Exception as e:
        return jsonify({'error': str(e)}), 500