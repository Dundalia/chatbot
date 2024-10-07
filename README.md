# chatbot interface

This is the silliest chatbot interface to play with GPT-4 throught the OpenAI API

## Features

- Chat interface to interact with GPT-4.
- Form to adjust model parameters.
- Conversation memory with the ability to clear history.

## Setup Instructions

### Prerequisites

- Python 3.x
- OpenAI API Key

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Dundalia/chatbot.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd ml-no-code-tool
   ```

3. **Create and activate a virtual environment**
   ```bash
    python -m venv venv
    # Activate the virtual environment
    # Windows:
    venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
    pip install -r requirements.txt
   ```

5. **Add your OpenAI API Key**
- Create a file named `key.txt` in the project root directory.
- Paste your OpenAI API key into `key.txt`.

6. **Run teh application**
   ```bash
    python app.py
   ```

7. **Access the application**
Open your web browser and navigate to `http://127.0.0.1:5000/`.

## Usage
- **Chat Interface**: Type messages to interact with the assistant.
- **Model Parameters**: Adjust `temperature` and `max_tokens` to change the assistant's behavior.
- **Clear Conversation**: Click the "Clear Conversation" button to reset the chat.

## License
This project is licensed under the MIT License.