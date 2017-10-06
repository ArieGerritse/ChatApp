import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  constructor(props){
    super(props);
  }


  render(){

    const messages = this.props.allMessages.messages.map(messages =>{
      console.log(this.props.allMessages.color);
      switch (messages.type) {
        case "postMessage":
          return <Message key={messages.id} username={messages.username} content={messages.content} style={"color:blue"}/>;
          break;
        case "incomingNotification":
          return <Notification key={messages.id} oldUsername={messages.oldUsername} newUsername={messages.newUsername}/>;
          break;
      }
    })

    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}

export default MessageList;