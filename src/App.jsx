import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// const server = new WebSocket("ws:localhost:3001");

class App extends Component {
  constructor(props) {
    super(props);
    this.newMessage = this.newMessage.bind(this);
    // this.sendNotification = this.sendNotification.bind(this);
    this.state = {
      connect: { server: new WebSocket('ws:localhost:3001') },
      currentUser: { name: 'Anonymous' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUsers: 1,
      color: 'black'
    };
  }

  componentDidMount() {
    this.state.connect.server.addEventListener('message', event => {
      let newMessage = JSON.parse(event.data);
      if (newMessage.type === 'numbersOnline') {
        this.setState({ onlineUsers: newMessage.online });
      } else {
        const newMessages = this.state.messages.concat(newMessage);
        this.setState({ messages: newMessages });
      }
    });
  }

  // sendNotification(newUsername, oldUsername){
  //   let newNotification = {type: "postNotification", username: newUsername, oldUsername: oldUsername};
  //   this.state.connect.server.send(JSON.stringify(newNotification));
  // }

  newMessage(newUsername, message) {
    let newMessage = {};
    if (newUsername === this.state.currentUser.name || newUsername === '') {
      newMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: message,
        color: this.state.color
      };
    } else {
      let newColor = getRandomColor();
      this.setState({ color: newColor });
      let newNotification = {
        type: 'postNotification',
        username: newUsername,
        oldUsername: this.state.currentUser.name
      };
      this.state.connect.server.send(JSON.stringify(newNotification));
      newMessage = {
        type: 'postMessage',
        username: newUsername,
        content: message,
        color: newColor
      };
      // this.state.currentUser.name = newUsername;
      this.setState({ currentUser: { name: newUsername } });
    }
    this.state.connect.server.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div className="Chatty">
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <span className="online">Online {this.state.onlineUsers}</span>
        </nav>
        <MessageList allMessages={this.state} />
        <ChatBar
          newMessage={this.newMessage}
          currentUser={this.state.currentUser.name}
        />
      </div>
    );
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default App;
