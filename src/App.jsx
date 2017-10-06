import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// const server = new WebSocket("ws:localhost:3001");


class App extends Component {
  constructor(props){
    super(props);
    this.newMessage = this.newMessage.bind(this);
    // this.sendNotification = this.sendNotification.bind(this);
    this.state = {
      connect: {server: new WebSocket("ws:localhost:3001")},
  currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [],
  notifications: [],
  onlineUsers: 0,
  color: "black"
};


  }


  componentDidMount(){

    this.state.connect.server.addEventListener('message', event =>{
      let newMessage = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(newMessage);
      this.setState({messages: newMessages});

    })

  };

  // sendNotification(newUsername, oldUsername){
  //   let newNotification = {type: "postNotification", username: newUsername, oldUsername: oldUsername};
  //   this.state.connect.server.send(JSON.stringify(newNotification));
  // }

  newMessage(newUsername, message){
    let newMessage = {};
    if(newUsername === this.state.currentUser.name || newUsername === ''){
      console.log('the same');
      newMessage = {type: "postMessage", username: this.state.currentUser.name, content: message};
    } else {
      newMessage = {type: "postMessage", username: newUsername, content: message};
      console.log(this.state.currentUser.name)
      // sendNotification(newUsername, newUsername)
      this.state.currentUser.name = newUsername;
      this.state.color = getRandomColor();
    }
    this.state.connect.server.send(JSON.stringify(newMessage));
  }


  render() {
    return (
      <div className='Chatty'>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList allMessages={this.state}/>
      <ChatBar newMessage={this.newMessage} currentUser={this.state.currentUser.name} />
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