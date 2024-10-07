from flask import Flask, render_template, request, jsonify, session
from openai import OpenAI
import os

app = Flask(__name__)

# Initialize default parameters
model_params = {
    'model': 'gpt-4o',
    'temperature': 0.7,
    'max_tokens': 150
}

# Replace with your OpenAI API key or use environment variable
try:
    with open('key.txt', 'r') as f:
        api_key = f.read().strip()
except FileNotFoundError:
    raise Exception("API key file 'key.txt' not found. Please create the file and add your OpenAI API key.")
client = OpenAI(api_key=api_key)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    try:
        # Retrieve conversation history from session
        conversation = session.get('conversation', [])
        # Add the user's message to the conversation history
        conversation.append({"role": "user", "content": user_message})
        # Send the conversation history to OpenAI API
        completion = client.chat.completions.create(
            model=model_params['model'],
            messages=conversation,
            temperature=model_params['temperature'],
            max_tokens=model_params['max_tokens']
        )
        assistant_message = completion.choices[0].message.content
        # Add the assistant's reply to the conversation history
        conversation.append({"role": "assistant", "content": assistant_message})
        # Save the updated conversation history back to the session
        session['conversation'] = conversation
        session.modified = True  # Mark the session as modified
        return jsonify({'reply': assistant_message})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/update_params', methods=['POST'])
def update_params():
    global model_params
    data = request.json
    model_params.update(data)
    return jsonify({'status': 'Parameters updated successfully'})

@app.route('/clear', methods=['POST'])
def clear_conversation():
    session.pop('conversation', None)
    session.modified = True  # Mark the session as modified
    return jsonify({'status': 'Conversation cleared successfully'})

if __name__ == '__main__':
    app.run(debug=True)
