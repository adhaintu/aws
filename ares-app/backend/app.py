from flask import Flask, request, jsonify

app = Flask(__name__)

# Simple in-memory list to store comments
comments = [
    {"name": "Admin", "comment": "Welcome! Leave your comment below."}
]

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "Flask Backend is Running"})

@app.route('/api/comments', methods=['GET', 'POST'])
def handle_comments():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get('name', '').strip()
        comment = data.get('comment', '').strip()
        if name and comment:
            comments.append({"name": name, "comment": comment})
        return jsonify({"message": "Saved", "comments": comments}), 201

    return jsonify({"comments": comments})

if __name__ == '__main__':
    app.run(port=8000, host='0.0.0.0', debug=True)