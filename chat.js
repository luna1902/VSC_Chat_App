const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');

// Connect to local server
const ws = new WebSocket('https://chat-backend-3bwg.onrender.com');

// Ensure all messages are read as text
ws.addEventListener('message', (event) => {
  // If the data is Blob, convert it to text
  if (event.data instanceof Blob) {
    event.data.text().then(text => addMessage(text));
  } else {
    addMessage(event.data);
  }
});

ws.addEventListener('open', () => console.log('Connected to server'));

function addMessage(message) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex justify-start';

  const msgPre = document.createElement('pre');
  msgPre.className = 'whitespace-pre-wrap';
  msgPre.textContent = message;

  wrapper.appendChild(msgPre);
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  ws.send(msg); // Send as string
  chatInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
