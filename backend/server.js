const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  console.log('Client connected. Total:', clients.length);

  ws.on('message', (message) => {
    // Force message to string
    const text = message.toString();
    console.log('Received:', text);

    // Broadcast as string
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(String(text)); // <- convert explicitly to string
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
    console.log('Client disconnected. Total:', clients.length);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
