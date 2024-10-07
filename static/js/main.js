document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const clearButton = document.getElementById('clear-button');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const paramsForm = document.getElementById('params-form');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    clearButton.addEventListener('click', clearConversation);

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage('user', message);
            userInput.value = '';
            fetch('/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message}),
                credentials: 'include' // Include credentials
            })
            .then(response => response.json())
            .then(data => {
                if (data.reply) {
                    appendMessage('assistant', data.reply);
                } else {
                    appendMessage('assistant', 'Error: ' + data.error);
                }
            });
        }
    }

    paramsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const temperature = parseFloat(document.getElementById('temperature').value);
        const maxTokens = parseInt(document.getElementById('max_tokens').value);
        fetch('/update_params', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({temperature, max_tokens: maxTokens}),
            credentials: 'include' // Include credentials
        })
        .then(response => response.json())
        .then(data => {
            alert(data.status);
        });
    });

    function clearConversation() {
        fetch('/clear', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include' // Include credentials
        })
        .then(response => response.json())
        .then(data => {
            chatWindow.innerHTML = '';
            alert(data.status);
        });
    }

    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'assistant-message');
        messageDiv.textContent = message;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
