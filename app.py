from flask import Flask, render_template, jsonify
import random
import os

app = Flask(__name__)

def get_random_word():
    # Ensures Python finds the text file even if terminal is in a different folder
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, "words.txt")
    
    with open(file_path, "r") as f:
        words = f.read().splitlines()
        
    # Filters out any accidental blank lines in your text file
    words = [w for w in words if w.strip()]
    return random.choice(words).upper()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/word")
def word():
    return jsonify({"word": get_random_word()})

if __name__ == "__main__":
    app.run(debug=True)