// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

// function createComment(input) {

//   let message = {
//     type: "incomingMessage",
//     id: uuidv4(),
//     username: input.username,
//     content: input.content
//   };

//   return JSON.stringify(message);

// }

// function createNotification(input) {

//   let message = {
//     type: "incomingNotification",
//     id: uuidv4(),
//     username: input.username,
//     oldUsername: input.old
//   };

//   return JSON.stringify(message);

// }

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    let parsed = JSON.parse(message);
    switch (parsed.type) {
      case 'postMessage':
        parsed.id = uuidv4();
        parsed.type = "incomingMessage";
        break;
      case 'postNotification':
        parsed.id = uuidv4();
        parsed.type = "incomingNotification";
        break;
      case 'postImage':
        break;
    }
    wss.broadcast(JSON.stringify(parsed));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});