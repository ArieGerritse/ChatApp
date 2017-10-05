import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// const server = new WebSocket("ws:localhost:3001");


class App extends Component {
  constructor(props){
    super(props);
    this.newMessage = this.newMessage.bind(this);
    this.state = {
      connect: {server: new WebSocket("ws:localhost:3001")},
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: 1
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: 2
    }
  ]
};


  }


  componentDidMount(){
    this.state.connect.server.onopen = function (event) {
      console.log('Server is running');
    };
  };

  receiveMessage(){
  this.state.connect.server.onmessage = function(event){

    var newMessage = JSON.parse(event.data);

    const newMessages = this.state.messages.concat(newMessage);
    this.setState({messages: newMessages});

  }
}

  newMessage(newUsername, message){
    let username = '';
    if(newUsername === ''){
      username = 'Anonymous';
    }else {
      username = newUsername;
    }
    const newMessage = {username: username, content: message};
    this.state.connect.server.send(JSON.stringify(newMessages[this.state.messages.length]));


  }

  render() {
    return (
      <div className='Chatty'>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList allMessages={this.state.messages}/>
      <ChatBar newMessage={this.newMessage} currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;