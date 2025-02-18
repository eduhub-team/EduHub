document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chatHistory');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });

    // Handle send message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        // Show loading
        loadingOverlay.style.display = 'flex';

        try {
            // Here you would normally make an API call to OpenAI
            // For now, we'll simulate a response
            await simulateAIResponse(message);
        } catch (error) {
            addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        } finally {
            loadingOverlay.style.display = 'none';
        }
    }

    // Simulate AI response (replace with actual API call)
    async function simulateAIResponse(message) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = `I understand you're asking about "${message}". Let me help you with that...`;
        addMessage(response, 'ai');
    }

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <i class="fas fa-${type === 'ai' ? 'robot' : 'user'}"></i>
                </div>
                <div class="message-text">${text}</div>
            </div>
        `;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Initialize chat
    chatHistory.scrollTop = chatHistory.scrollHeight;
});