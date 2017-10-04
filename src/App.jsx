import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.newMessage = this.newMessage.bind(this);
    this.state = {
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

  newMessage(newUsername, message){
    let newID = this.state.messages.length + 1;
    let username = '';
    console.log(newUsername);
    if(newUsername === ''){
      username = 'Anonymous';
    }else {
      username = newUsername;
    }
    const newMessage = {id: newID, username: username, content: message};
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({messages: newMessages})
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