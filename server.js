const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log('🟢 WebSocket server running on ws://localhost:3001');

wss.on('connection', function connection(ws) {
  console.log('🔌 New client connected');

  ws.on('message', function incoming(data) {
    console.log('📨 Received:', data.toString());
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
